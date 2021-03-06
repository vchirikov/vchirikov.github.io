---
img: img/0003-01-nerdbank.gitversioning.png
title: Nerdbank.GitVersioning with Docker
topic: Powershell
---
Today we will talk about an amazing versioning package called [Nerdbank.GitVersioning](https://github.com/dotnet/Nerdbank.GitVersioning). This package adds semver git-based versioning to many types of projects. In short, it's a must-have package. But when I when started use it with docker I ran into several problems.  

<!-- </spoiler> -->

TLDR: [Repository link](https://github.com/vchirikov/nerdbankgitversioning-docker)  
  
One of them was a TeamCity issue with git clone. TeamCity uses git alternates for a faster repository cloning and if you just copy `.git` directory into a build context it won't work (because with alternates `.git` doesn't contain full repository info). There are 2 options here. One of them is disabling git cloning with alternates (`teamcity.git.useAlternates=false`) in TeamCity. It is a bad option because it will increase the download size and decrease an overall build speed. Another option is making git dissociate after cloning by yourself.  
  
Next in the article I will use PowerShell Core, because it is shipped with dotnet sdk and it is cross-platform.  

```powershell
function GitDissociate {
  if (Test-Path "./.git/objects/info/alternates") {
    $null = & git repack -a -d
    Remove-Item "./.git/objects/info/alternates" -Recurse -ErrorAction Ignore
  }
}
```

Now we can copy .git to our build context in Dockerfile (`COPY .git/ .git/`). But we shouldn't do that! Copying `.git` directory into build context is a bad practice (because it increases build context size, it is not needed for building code, etc). But Nerdbank.GitVersioning requires .git to work properly. What we can do? We can override Nerdbank.GitVersioning MSBuild target where the package generates version properties and it should work. When I was trying to do this, I came across several differences in the behavior of dotnet cli / PowerShell Core ( I have Linux / Windows TeamCity agents so the solution must support them).
For example PowerShell Core has a ton of issues with managed and native assembly loaders. Dotnet CLI has a different output between Windows and Linux in command `dotnet nuget locals global-packages -l`
But I found a workaround for each of these problems. This script might not be an ideal solution but it works.  
  
For clarity I describe steps of script:
  
* Make Git dissociate
* Try to find Nerdbank.GitVersioning version. I use [CentralPackageVersions](https://github.com/microsoft/MSBuildSdks/), so I'm looking for it in Packages.props
* Look this version in nuget packages cache, if it is not found we will run `dotnet restore`
* Load the managed assembly with Nerdbank.GitVersioning
* Load the native assembly with libgit2 for interop (this step has several workarounds because of "custom" behavior of NativeLoader in PowerShell Core for alpine / ubuntu, including symlink creation)
* Get MSBuild properties from Nerdbank.GitVersioning `VersionOracle`
* Write these properties into Nerdbank.GitVersioning.targets and override `GetBuildVersion` Nerdbank.GitVersioning target.

And also we should load this file from [`Directory.Build.targets`](https://github.com/vchirikov/nerdbankgitversioning-docker/blob/master/Directory.Build.targets).

```xml
<Project>
  <Sdk Name="Microsoft.Build.CentralPackageVersions" Version="2.0.52" />
  <Import Condition="Exists('$(MSBuildThisFileDirectory)Nerdbank.GitVersioning.targets')" Project="$(MSBuildThisFileDirectory)Nerdbank.GitVersioning.targets" />
</Project>

```

I've created [the repository with this solution](https://github.com/vchirikov/nerdbankgitversioning-docker). Any pull requests with improvements are welcome!

That's all, now versioning is working and we don't need to copy `.git` into docker build context.

[Script](https://github.com/vchirikov/nerdbankgitversioning-docker/blob/master/GenerateNerdbankGitVersioningTargets.ps1):

```powershell
#!/usr/bin/env pwsh

if (!(Test-Path "version.json")) {
  Write-Warning "NerdBank.GitVersioning isn't presented. Check that version.json exists";
  exit -1;
}

# Adds .git to dockerignore if it is not presented / uncomment this line
if (Test-Path ".dockerignore") {
  [string] $dockerignoreContent = [System.IO.File]::ReadAllText(".dockerignore");
  if (!$dockerignoreContent.Contains(".git")) {
    Add-Content -Path .dockerignore -Value ".git"
  }
  else {
    [System.Text.RegularExpressions.RegexOptions] $regOpt = [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Multiline -bor [System.Text.RegularExpressions.RegexOptions]::CultureInvariant;
    $dockerignoreContent = [System.Text.RegularExpressions.Regex]::Replace($dockerignoreContent , "^[^#]*[#]+(.*\.git.*)$", "`$1", $regOpt);
    [System.IO.File]::WriteAllText(".dockerignore", $dockerignoreContent);
  }
}

function GitDissociate {
  if (Test-Path "./.git/objects/info/alternates") {
    $null = & git repack -a -d
    Remove-Item "./.git/objects/info/alternates" -Recurse -ErrorAction Ignore
  }
}

function CheckAndInstallLibSsl {
  # Nerdbank.GitVersioning has its own lib2git with libssl1.0 dependency
  # but for example current alpine doesn't have libssl1.0 package, we'll install it if needed
  $osName = Get-Content "/etc/os-release" | Select-String -Pattern "^Name=";
  $osName = $osName.ToString().Split("=")[1].Replace('"', '');

  if ($osName -like "Ubuntu*" -and !(Test-Path "/usr/lib/x86_64-linux-gnu/libssl.so.1.0.0")) {

    Write-Warning "Can't find /usr/lib/libssl.so.1.0.0 on ubuntu. Installing libssl1.0";
    $null = & apt-get update -y
    $null = & apt-get install -y --no-install-recommends libssl1.0.0
  }
  elseif ($osName -like "Alpine*" -and !(Test-Path "/usr/lib/libssl.so.1.0.0")) {
    Write-Warning "Can't find /usr/lib/libssl.so.1.0.0 on alpine linux. Installing libssl1.0...";
    $null = & apk add --no-cache libssl1.0 --repository http://dl-cdn.alpinelinux.org/alpine/v3.8/main
  }
}

# powershell doesn't work well with native libs with 'lib' prefix and runtimes, so we'll make symbol link as workaround
function LinuxNativeLibraryLoaderWorkaround {
  param (
    [string] $nbgvPath
  )
  # check, maybe symbol link already exists
  $gitNativeLib = Get-ChildItem -Path $([System.IO.Path]::Combine($nbgvPath, "lib", "linux-x64")) -Filter "lib*" | Select-Object -First 1;
  if (!([string]::IsNullOrWhiteSpace($gitNativeLib))) {

    [string] $rid = "linux-x64";
    $osName = Get-Content "/etc/os-release" | Select-String -Pattern "^Name=";
    $osName = $osName.ToString().Split("=")[1].Replace('"', '');

    if ($osName -like "Ubuntu*") {
      $rid = "ubuntu.18.04-x64";
    }
    elseif ($osName -like "Alpine*") {
      $rid = "alpine-x64";
    }
    # change native path to specific rid
    [string] $parentDir = $([System.IO.Path]::GetFullPath([System.IO.Path]::Combine($nbgvPath, "..")));
    $gitNativeLib = Get-ChildItem -Path $([System.IO.Path]::Combine($parentDir, "runtimes", $rid, "native")) -Filter "lib*" | Select-Object -First 1;

    # powershell NativeLibrary.Load tries to load the native lib without lib prefix, but with .so extension
    [string] $symlink = [System.IO.Path]::GetFileName($gitNativeLib).Replace("lib", "");
    # powershell NativeLibrary.Load tries to load from path without /lib/ directory
    $symlink = [System.IO.Path]::Combine($nbgvPath, "linux-x64", $symlink);
    if (!(Test-Path $symlink)) {
      $null = & mkdir -p $([System.IO.Path]::Combine($nbgvPath, "linux-x64"))
      $null = & ln -fs $gitNativeLib $symlink
    }
    $gitNativeLib = $symlink;

  }
  else {
    Write-Error "Can't find libgit2";
    exit -1;
  }
  return $gitNativeLib;
}

# searches the real dotnet executable
function GetDotnetPath {
  [string] $dotnet = $env:DOTNET_ROOT;

  if ([string]::IsNullOrEmpty($dotnet)) {
    if ($IsWindows) {
      $dotnet = [System.IO.Path]::Combine($env:ProgramFiles, "dotnet", "dotnet.exe");
    }
    else {
      $dotnet = "/usr/share/dotnet/dotnet";
    }
  }
  else {
    if ($IsWindows) {
      $dotnet = [System.IO.Path]::Combine($dotnet, "dotnet.exe");
    }
    else {
      $dotnet = [System.IO.Path]::Combine($dotnet, "dotnet");
    }
  }
  return $dotnet;
}
# ToDo: load and find reference via Microsoft.Build.Framework (?)
function GetNBGVVersion {
  [string] $nbgvVersion = $env:NBGV_VERSION;
  if ([string]::IsNullOrWhiteSpace($nbgvVersion)) {
    if (Test-Path "Packages.props") {
      $nbgvVersion = Select-String -path "Packages.props" -Pattern '<PackageReference Update="Nerdbank\.GitVersioning".+Version="(?<version>[^"]+)"[^/]*/>' | ForEach-Object { $_.matches.groups[1].Value }
    }
    else {
      Write-Error "You must set NBGV_VERSION environment variable or must use CentralPackageVersions";
      exit -1;
    }
  }
  return $nbgvVersion;
}

GitDissociate

[string] $dotnet = GetDotnetPath
[string] $nbgvVersion = GetNBGVVersion
[string] $nugetCachePath = $env:NUGET_PACKAGES;

if ([string]::IsNullOrWhiteSpace($nugetCachePath)) {
  # dotnet on linux add to input `info: ` so we can't just use .split() here
  $nugetCachePath = (& $dotnet nuget locals global-packages -l ) | Select-String -Pattern 'global-packages: ([^\n\r]+)$' | ForEach-Object { $_.matches.groups[1].Value };
}

[string] $nbgvPath = [System.IO.Path]::Combine($nugetCachePath, "nerdbank.gitversioning", $nbgvVersion, "build", "MSBuildFull");

if (!(Test-Path $nbgvPath)) {
  Write-Warning "NerdBank.GitVersioning $nbgvVersion isn't presented in nuget cache ( $nugetCachePath ). Restoring packages...";
  & $dotnet restore
  if (!(Test-Path $nbgvPath)) {
    Write-Error "dotnet restore didn't restore NerdBank.GitVersioning $nbgvVersion";
    exit -1;
  }
}

Write-Host "Nerdbank.GitVersioning is found with version $nbgvVersion";

try {
  $null = [System.Runtime.Loader.AssemblyLoadContext]::Default.LoadFromAssemblyPath([System.IO.Path]::Combine($nbgvPath, "Validation.dll"));
  $null = [System.Runtime.Loader.AssemblyLoadContext]::Default.LoadFromAssemblyPath([System.IO.Path]::Combine($nbgvPath, "NerdBank.GitVersioning.dll"));
  $null = [System.Runtime.Loader.AssemblyLoadContext]::Default.LoadFromAssemblyPath([System.IO.Path]::Combine($nbgvPath, "LibGit2Sharp.dll"));
  $null = [System.Runtime.Loader.AssemblyLoadContext]::Default.LoadFromAssemblyPath([System.IO.Path]::Combine($nbgvPath, "Newtonsoft.Json.dll"));
}
catch { }

try {
  # [Nerdbank.GitVersioning.GitExtensions]::FindLibGit2NativeBinaries($nbgvPath) doesn't work with linux \ osx
  #[string] $nativeLibPath = [Nerdbank.GitVersioning.GitExtensions]::FindLibGit2NativeBinaries($nbgvPath);

  
  [string] $gitNativeLib = "/tmp/libgit2.so";
  if ($IsWindows) {
    [string] $nativeLibPath = "";
    if ([System.IntPtr]::Size -eq 4) {
      $nativeLibPath = [System.IO.Path]::Combine($nbgvPath, "lib", "win32", "x86");
    }
    else {
      $nativeLibPath = [System.IO.Path]::Combine($nbgvPath, "lib", "win32", "x64");
    }
    $gitNativeLib = Get-ChildItem -Path $nativeLibPath | Select-Object -First 1;
  }
  elseif ($IsLinux) {
    CheckAndInstallLibSsl;
    $gitNativeLib = LinuxNativeLibraryLoaderWorkaround -nbgvPath $nbgvPath;

  }
  elseif ($IsMacOS) {
    # I think it won't work, but I don't have an osx for testing
    $nativeLibPath = [System.IO.Path]::Combine($nbgvPath, "lib", "osx");
  }
  
  Write-Host "gitNativeLib is $gitNativeLib";
  $null = [System.Runtime.InteropServices.NativeLibrary]::Load($gitNativeLib)
}
catch {
  Write-Error "Can't load lib2git native library";
  Write-Error $PSItem.Exception;
  return;
}

try {
  $CloudBuild = [Nerdbank.GitVersioning.CloudBuild]::Active;
  $versionOracle = [Nerdbank.GitVersioning.VersionOracle]::Create([System.IO.Path]::GetFullPath("."), $null, $CloudBuild);
}
catch {
  Write-Error $PSItem.Exception;
  return;
}

$gitCommitDateTicks = "";
if ($versionOracle.GitCommitDate.HasValue) {
  $gitCommitDateTicks = $versionOracle.GitCommitDate.Value.Ticks.ToString([System.Globalization.CultureInfo]::InvariantCulture);
}

# so now we can create target file with override

$text = @"
<Project>
<Target Name="GetBuildVersion">
  <PropertyGroup>
    <BuildVersion Condition="'`$(BuildVersion)' == ''">$($versionOracle.Version.ToString())</BuildVersion>
    <AssemblyInformationalVersion Condition="'`$(AssemblyInformationalVersion)' == ''">$($versionOracle.AssemblyInformationalVersion.ToString())</AssemblyInformationalVersion>
    <AssemblyFileVersion Condition="'`$(AssemblyFileVersion)' == ''">$($versionOracle.AssemblyFileVersion.ToString())</AssemblyFileVersion>
    <FileVersion Condition="'`$(FileVersion)' == ''">$($versionOracle.AssemblyFileVersion.ToString())</FileVersion>
    <BuildVersionSimple Condition="'`$(BuildVersionSimple)' == ''">$($versionOracle.SimpleVersion.ToString())</BuildVersionSimple>
    <PrereleaseVersion Condition="'`$(PrereleaseVersion)' == ''">$($versionOracle.PrereleaseVersion.ToString())</PrereleaseVersion>
    <MajorMinorVersion Condition="'`$(MajorMinorVersion)' == ''">$($versionOracle.MajorMinorVersion.ToString())</MajorMinorVersion>
    <AssemblyVersion Condition="'`$(AssemblyVersion)' == ''">$($versionOracle.AssemblyVersion.ToString())</AssemblyVersion>
    <GitCommitId Condition="'`$(GitCommitId)' == ''">$($versionOracle.GitCommitId.ToString())</GitCommitId>
    <GitCommitIdShort Condition="'`$(GitCommitIdShort)' == ''">$($versionOracle.GitCommitIdShort.ToString())</GitCommitIdShort>
    <GitCommitDateTicks Condition="'`$(GitCommitDateTicks)' == ''">$($gitCommitDateTicks)</GitCommitDateTicks>
    <GitVersionHeight Condition="'`$(GitVersionHeight)' == ''">$($versionOracle.VersionHeight)</GitVersionHeight>
    <BuildNumber Condition="'`$(BuildNumber)' == ''">$($versionOracle.BuildNumber.ToString())</BuildNumber>
    <BuildVersionNumberComponent Condition="'`$(BuildVersionNumberComponent)' == ''">$($versionOracle.BuildNumber.ToString())</BuildVersionNumberComponent>
    <PublicRelease Condition="'`$(PublicRelease)' == ''">$($versionOracle.PublicRelease.ToString())</PublicRelease>
    <CloudBuildNumber Condition="'`$(CloudBuildNumber)' == ''">$($versionOracle.CloudBuildNumber.ToString())</CloudBuildNumber>
    <SemVerBuildSuffix Condition="'`$(SemVerBuildSuffix)' == ''">$($versionOracle.BuildMetadataFragment.ToString())</SemVerBuildSuffix>
    <NuGetPackageVersion Condition="'`$(NuGetPackageVersion)' == ''">$($versionOracle.NuGetPackageVersion.ToString())</NuGetPackageVersion>
    <ChocolateyPackageVersion Condition="'`$(ChocolateyPackageVersion)' == ''">$($versionOracle.ChocolateyPackageVersion.ToString())</ChocolateyPackageVersion>
    <Version Condition="'`$(Version)' == ''">$($versionOracle.NuGetPackageVersion.ToString())</Version>
    <PackageVersion Condition="'`$(PackageVersion)' == ''">$($versionOracle.NuGetPackageVersion.ToString())</PackageVersion>
    <NPMPackageVersion Condition="'`$(NPMPackageVersion)' == ''">$($versionOracle.NPMPackageVersion.ToString())</NPMPackageVersion>
  </PropertyGroup>
</Target>
</Project>
"@
[System.IO.File]::WriteAllText("Nerdbank.GitVersioning.targets", $text);

Write-Host "Nerdbank.GitVersioning.target has been generated. Version: $($versionOracle.NuGetPackageVersion.ToString())";
```
