--- script/node_modules/electron-packager/src/targets.js.orig	2021-02-15 12:23:04 UTC
+++ script/node_modules/electron-packager/src/targets.js
@@ -5,10 +5,11 @@ const { getHostArch } = require('@electron/get')
 const semver = require('semver')
 
 const officialArchs = ['ia32', 'x64', 'armv7l', 'arm64', 'mips64el']
-const officialPlatforms = ['darwin', 'linux', 'mas', 'win32']
+const officialPlatforms = ['darwin', 'linux', 'freebsd', 'mas', 'win32']
 const officialPlatformArchCombos = {
   darwin: ['x64'],
   linux: ['ia32', 'x64', 'armv7l', 'arm64', 'mips64el'],
+  freebsd: ['x64'],
   mas: ['x64'],
   win32: ['ia32', 'x64', 'arm64']
 }
@@ -27,6 +28,7 @@ const buildVersions = {
 const osModules = {
   darwin: './mac',
   linux: './linux',
+  freebsd: './linux',
   mas: './mac', // map to darwin
   win32: './win32'
 }
