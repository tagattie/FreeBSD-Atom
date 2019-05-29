# Atom port for FreeBSD
This repository contains a highly experimental port of Atom for FreeBSD. The port is largely based on:

- Atom patches and build procedures by [@prash-wghats](https://github.com/prash-wghats/)

**NOTE:** This port is **NOT** compatible with poudriere.

## Build
To build artifacts for yourself, be sure you have the ports tree on your machine. If not, run the following commands:

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

## Run

``` shell
atom-dev
```

## Platform
- Built on FreeBSD 12 amd64.

## Credits
- Atom patches and build scripts by @prash-wghats at [Electron-VSCode-Atom-For-FreeBSD](https://github.com/prash-wghats/Electron-VSCode-Atom-For-FreeBSD)
