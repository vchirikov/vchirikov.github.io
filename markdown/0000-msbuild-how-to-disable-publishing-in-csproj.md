---
img: img/0000-01-msbuild.jpg
title: How to disable publishing of a project in csproj with msbuild property?
topic: MSBuild
---

As you may know if you do something like `dotnet publish Solution.sln -c Release`, test projects will also be published.  
However, you can disable this behavior by setting MSBuild property `<IsPublishable>false</IsPublishable>`.  
Put it in the csproj / Directory.Build.props and the project will be excluded from publishing.
<!-- </spoiler> -->