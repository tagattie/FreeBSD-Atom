--- script/lib/package-application.js.orig	2019-05-22 03:44:37 UTC
+++ script/lib/package-application.js
@@ -46,7 +46,7 @@ module.exports = function () {
     if (process.platform === 'darwin') {
       bundledResourcesPath = path.join(packagedAppPath, 'Contents', 'Resources')
       setAtomHelperVersion(packagedAppPath)
-    } else if (process.platform === 'linux') {
+    } else if (process.platform === 'linux' || process.platform === 'freebsd') {
       bundledResourcesPath = path.join(packagedAppPath, 'resources')
       chmodNodeFiles(packagedAppPath)
     } else {
@@ -75,7 +75,7 @@ function copyNonASARResources (packagedAppPath, bundle
   }
   if (process.platform === 'darwin') {
     fs.copySync(path.join(CONFIG.repositoryRootPath, 'resources', 'mac', 'file.icns'), path.join(bundledResourcesPath, 'file.icns'))
-  } else if (process.platform === 'linux') {
+  } else if (process.platform === 'linux' || process.platform === 'freebsd') {
     fs.copySync(path.join(CONFIG.repositoryRootPath, 'resources', 'app-icons', CONFIG.channel, 'png', '1024.png'), path.join(packagedAppPath, 'atom.png'))
   } else if (process.platform === 'win32') {
     [ 'atom.cmd', 'atom.sh', 'atom.js', 'apm.cmd', 'apm.sh', 'file.ico', 'folder.ico' ]
@@ -141,7 +141,7 @@ function renamePackagedAppDir (packageOutputDirPath) {
     packagedAppPath = path.join(CONFIG.buildOutputPath, appBundleName)
     if (fs.existsSync(packagedAppPath)) fs.removeSync(packagedAppPath)
     fs.renameSync(path.join(packageOutputDirPath, appBundleName), packagedAppPath)
-  } else if (process.platform === 'linux') {
+  } else if (process.platform === 'linux' || process.platform === 'freebsd') {
     const appName = CONFIG.channel !== 'stable' ? `atom-${CONFIG.channel}` : 'atom'
     let architecture
     if (HOST_ARCH === 'ia32') {
