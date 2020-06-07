---
img: img/0004-01-windows-shells.jpg
title: Nerdbank.GitVersioning with Docker
topic: Powershell
---

Hi guys, today we will talk about wsl2 and I'll share tips about different shells on windows.

<!-- </spoiler> -->

![zsh on wsl2](/markdown/img/0004-02-windows-shells.png)

Let's start with installing of wsl and wsl2.

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

After this we should install kernel update from [here](https://docs.microsoft.com/en-us/windows/wsl/wsl2-kernel)

Also we can change default wsl version:

```powershell
wsl --set-default-version 2
```

And then we can install a Linux distro. I prefer Ubuntu, so you can
get  [Ubuntu 20.04 LTS from Microsoft Store](https://www.microsoft.com/en-us/p/ubuntu-2004-lts)
Next commands will use `Ubuntu-20.04` as the distro name, you can change it to own distro name if needed.

If you have ubuntu before you can change wsl to wsl2 with this command:

```powershell
wsl --set-version Ubuntu-20.04 2
```

After this we should get our distro in [Windows Terminal](https://www.microsoft.com/en-us/p/windows-terminal)

Also, I suggest to add default distro for easy switching between Ubuntu and Powershell console.

```powershell
wsl --set-default Ubuntu-20.04
```

Now if you type `wsl` in PowerShell / cmd console you will switch to ubuntu shell, after `exit` (or `Ctrl+D`) you will return to your windows shell.

I want to share my [Windows Terminal config](https://gist.github.com/vchirikov/0b5843944f5016f58081efab6ae6a5d0)

Don’t replace guid of your wsl2 profile with mine.

So let's make our shell awesome in wsl2.
I use wsl2 with root rights, if you want too you can type:

```powershell
ubuntu2004 config --default-user root
```

## Zsh

```bash
wsl
apt-get install zsh git
chsh -s $(which zsh)
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Exit from wsl shell, and rerun `wsl`. Now we can install an advanced theme for zsh.

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
```

Now we should enable the theme and some other flags.
Add this in `~/.zshrc` (I use `vi` or `code` (vscode) for this)

```
# place this line near start of file
ZSH_DISABLE_COMPFIX=true
# find ZSH_THEME and replace the line to this
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Run this for configure p10k.

For powerlevel10k we need install a nerd font (with icons) in Windows terminal.

You can found font that you want, google something like `{FontName} nerd font`. Here some of them:

* [Consolas NF](https://github.com/whitecolor/my-nerd-fonts/tree/master/Consolas%20NF) (standard font with icons)
* [MesloLGS NF](https://github.com/romkatv/dotfiles-public/tree/master/.local/share/fonts/NerdFonts)

Don't forget install and enable this font in [`settings.json`](https://gist.github.com/vchirikov/0b5843944f5016f58081efab6ae6a5d0).

Now you can configure p10k:

```bash
p10k configure
```

Let's install useful plugins to zsh:

### z-sh

ZSH-z is a command line tool that allows you to jump quickly to directories that you have visited frequently in the past, or recently. It works by keeping track of when you go to directories and how much time you spend in them.

[agkozak/zsh-z](https://github.com/agkozak/zsh-z)

```bash
git clone --depth=1 https://github.com/agkozak/zsh-z $ZSH_CUSTOM/plugins/zsh-z
```

### zsh-autosuggestions

This plugin [suggests commands](https://asciinema.org/a/37390) as you type based on history and completions.

[zsh-users/zsh-autosuggestions: Fish-like autosuggestions for zsh](https://github.com/zsh-users/zsh-autosuggestions)

```bash
git clone --depth=1 git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### Plugin install

```bash
# find line with plugins and change to this
plugins=(git zsh-z zsh-autosuggestions)
```

### Next-gen ls command

[Written on Rust colorized `ls`.](https://github.com/Peltoche/lsd)

### Next-gen cat command

A `cat` clone with syntax highlighting and Git integration.

<https://github.com/sharkdp/bat>

### Additional .zshrc settings

This commands can be placed at the bottom of file.

#### ls colors

 You can change background of dirs in `ls` command with this line in .zshrc

```bash
export LS_COLORS="rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;01:ow=34;01:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:"
```

#### Man colorize

Colorizes `man` command.

```bash
export LESS_TERMCAP_mb=$'\e[1;32m'
export LESS_TERMCAP_md=$'\e[1;32m'
export LESS_TERMCAP_me=$'\e[0m'
export LESS_TERMCAP_se=$'\e[0m'
export LESS_TERMCAP_so=$'\e[01;33m'
export LESS_TERMCAP_ue=$'\e[0m'
export LESS_TERMCAP_us=$'\e[1;4;31m'
```

#### Additional zsh flags

```bash
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_ALL_DUPS
setopt HIST_FIND_NO_DUPS
setopt HIST_SAVE_NO_DUPS
setopt HIST_REDUCE_BLANKS
setopt HIST_EXPIRE_DUPS_FIRST
setopt HIST_IGNORE_DUPS
HISTSIZE=5000
SAVEHIST=500
ZSH_AUTOSUGGEST_USE_ASYNC=1
```

#### Aliases

```bash
# Aliases
# https://github.com/Peltoche/lsd
alias ls='lsd -a --group-dirs first'
alias cat='batcat --pager=never --theme="OneHalfDark"'
alias less='batcat --theme="OneHalfDark"'
```

#### Slow WSL2 I/O workarounds

As you can see, wsl2 too slow with [many I/O operations](https://github.com/microsoft/WSL/issues/4197).

>WSL 2 using its built in NTFS support (going via the 9p service exposed by the Window host) is unusably slow. As a rule of thumb, WSL 2 accessing host (NTFS) files is about 5 times slower than WSL 1 accessing those same files.
>Mounting the NTFS filesystem using Linux’s samba / cifs support in the WSL 2 container gets you timings that are 4x faster than the built-in 9p NTFS access, but still between 0.25x and 2x slower than WSL 1’s built-in support for accessing Windows files.

<https://vxlabs.com/2019/12/06/wsl2-io-measurements/>

But I found several workarounds about it. First of all let's try to solve the slowness with a large git repository.

Create `/usr/local/bin/git` file and set `chmod +x /usr/local/bin/git`

```bash
#!/bin/sh
case "$PWD" in
    /mnt/?/*) exec git.exe "$@" ;;
    *) exec /usr/bin/git "$@" ;;
esac
```

So we will use `git.exe` if we are on `/mnt/*` directory. git.exe doesn't use i/o interop with wsl2 so it much much faster.
But zsh doesn't use git for prompt. It uses `gitstatusd` for this purpose. We can disable `gitstatusd` and use `git.exe` for that.

```bash
POWERLEVEL9K_DISABLE_GITSTATUS=true
```

If you still feeling slowness of prompt you can add these flags too:

```bash
POWERLEVEL9K_VCS_GIT_HOOKS=(vcs-detect-changes)
POWERLEVEL9K_VCS_HIDE_TAGS=true
POWERLEVEL9K_VCS_SHOW_SUBMODULE_DIRTY=false
```

#### dotnet -> dotnet.exe

```bash
# run windows dotnet executable from wsl2
alias dotnet='dotnet.exe'
```

#### Windows terminal and wsl2

Windows terminal works bad with wsl2. [Issue for tracking the progress here](https://github.com/microsoft/terminal/issues/4999)

What we can improve at the moment?

```bash
# Control + Delete
bindkey "5~" kill-word
# Control + Backspace
bindkey "^H" backward-kill-word
# Control + Space for zsh-autosuggestion
bindkey '^ ' autosuggest-accept
```

#### WSL2 drop vm cache aliases

```bash
# from https://github.com/microsoft/WSL/issues/4166
alias vm_gc='echo 1 > /proc/sys/vm/compact_memory'
alias vm_drop_cache='echo 1 > /proc/sys/vm/drop_caches'

```

#### How to use credentionals from Windows on WSL git

```bash
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/libexec/git-core/git-credential-manager.exe"
```

#### Disable anti-virus on wsl2 activities

[Antivirus and WSL](https://vxlabs.com/2019/05/23/windows-10-anti-virus-slows-down-hugo-and-wsl/)

## Fzf

Fzf is a general-purpose command-line fuzzy finder. It's an interactive Unix filter for command-line that can be used with any list; files, command history, processes, hostnames, bookmarks, git commits, etc.

[Fzf introduce](https://www.youtube.com/watch?v=qgG5Jhi_Els)

### Install on zsh

```bash
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

### Intall on windows

I prefer install fzf with [`choco`](https://chocolatey.org/)

```powershell
choco install fzf
```

And after this we can install [PowerShell module](https://github.com/kelleyma49/PSFzf)
You can see how to use it there and also take a look at my powershell profile below.

## Powershell

[My powershell profile](https://gist.github.com/vchirikov/b9b2502850304c66ff8afe0af3f5eca5)

## Cmd

* [ColorTool](https://github.com/microsoft/terminal/tree/master/src/tools/ColorTool)
* [My ColorTool config](https://gist.github.com/vchirikov/4bf20038059ea53127f66847837a3cf3)

## Useful links:

* [Windows Command Line](https://devblogs.microsoft.com/commandline/)
* [Wsl2 resources](https://docs.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig)
* [WSL2 Memory](https://devblogs.microsoft.com/commandline/memory-reclaim-in-the-windows-subsystem-for-linux-2/)
* [Intresting blog about WSL / WSL2](https://wsl.dev/)
