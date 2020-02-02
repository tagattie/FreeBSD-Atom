# Atom port for FreeBSD
This repository contains an experimental port of Atom for FreeBSD. The port is largely based on:

- Atom patches and build procedures by [@prash-wghats](https://github.com/prash-wghats/)

## Get
A package file is available at the releases page. To install, download the file (with .txz extension) and run the command:

``` shell
pkg install atom-<version>.txz
```

## Run

``` shell
atom
```

## Build
If you would like to build artifacts for yourself, be sure you have the ports tree on your machine. If not, run the following commands:

``` shell
portsnap fetch
portsnap extract
```

Clone this repository with git command and build/install atom:

``` shell
git clone https://github.com/tagattie/FreeBSD-Atom
cd FreeBSD-Atom/editors/atom
make install clean
```

## Platform
- Built on FreeBSD 11 and 12 amd64.

## Credits
- Atom patches and build scripts by @prash-wghats at [Electron-VSCode-Atom-For-FreeBSD](https://github.com/prash-wghats/Electron-VSCode-Atom-For-FreeBSD)
