---
img: img/0001-01-windbg.png
title: Windbg cheatsheet
topic: WinDbg
---

If you're not familiar with WinDbg this information or links can be useful. Here I'm going to add tips, tricks, link to docs about WinDbg.
<!-- </spoiler> -->

First of all you need to know, how to install WinDbg. Today we can only use the new WinDbg, which is called [WinDbg Preview](https://www.microsoft.com/en-us/p/windbg-preview/9pgjgd53tn86).
WinDbg has extension for debugging managed apps which is called SOS. Before netcore we had also additional extensions which can help us to debug framework apps. There are psscor4, sosex and some other.
But I'm not going to touch these extensions here.

## Symbol servers

Microsoft has several symbol servers so we need add them all for better experience :)
You should set environment variable with name `_NT_SYMBOL_PATH`. The value of this variable can specify directory for the symbol cache. I use `C:\dbg_symbol_cache` for that:  

`SRV*C:\dbg_symbol_cache*http://msdl.microsoft.com/download/symbols;SRV*C:\dbg_symbol_cache*http://referencesource.microsoft.com/symbols;SRV*C:\dbg_symbol_cache*https://nuget.smbsrc.net;CACHE*C:\dbg_symbol_cache`  

Also WinDbg has special command for symbol servers - `!setsymbolserver` you can read about it: `!help setsymbolserver`

## SOS

WinDbg has logic to load sos automaticly but if something went wrong you can load the extension manually. Installation:

```bash
dotnet tool install -g dotnet-sos
dotnet-sos install
```

After this you can load sos by `!load %userprofile%\.dotnet\sos\sos.dll` command. change %userprofile% to your user profile directory.

## SOS commands

I think it is not necessary to have list of these commands here, you can read them in `!help` or `!help {command}` output.
Full list of [sos commands](https://github.com/dotnet/diagnostics/blob/master/documentation/sos-debugging-extension-windows.md) can be found [here](https://github.com/dotnet/diagnostics/blob/master/documentation/sos-debugging-extension-windows.md)

## Tips

* You can change the number base (radix) with [`n` command](https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/n--set-number-base-)
And convert for example a number from 16 radix to 10 radix with `?` command
* You can use `kpL100` with or without SOS, for example we would like to see the call stack (k) with parameters (p), without line numbers (L), and at least 0x100 frames (100):

## Useful links

* <https://docs.microsoft.com/en-us/dotnet/framework/tools/sos-dll-sos-debugging-extension>
* <https://github.com/dotnet/diagnostics/blob/master/documentation/sos-debugging-extension-windows.md>
