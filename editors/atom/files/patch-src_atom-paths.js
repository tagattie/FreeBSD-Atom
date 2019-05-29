--- src/atom-paths.js.orig	2019-05-22 03:44:37 UTC
+++ src/atom-paths.js
@@ -15,7 +15,8 @@ const hasWriteAccess = (dir) => {
 const getAppDirectory = () => {
   switch (process.platform) {
     case 'darwin':
-      return process.execPath.substring(0, process.execPath.indexOf('.app') + 4)
+	  return process.execPath.substring(0, process.execPath.indexOf('.app') + 4)
+    case 'freebsd':
     case 'linux':
     case 'win32':
       return path.join(process.execPath, '..')
