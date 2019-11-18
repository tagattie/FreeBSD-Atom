--- src/atom-paths.js.orig	2019-10-21 17:33:40 UTC
+++ src/atom-paths.js
@@ -19,6 +19,7 @@ const getAppDirectory = () => {
         0,
         process.execPath.indexOf('.app') + 4
       );
+    case 'freebsd':
     case 'linux':
     case 'win32':
       return path.join(process.execPath, '..');
