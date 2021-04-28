--- node_modules/spell-check/lib/checker-env.js.orig	2021-04-28 06:40:37 UTC
+++ node_modules/spell-check/lib/checker-env.js
@@ -1,6 +1,6 @@
 module.exports = {
     isLinux() {
-        return /linux/.test(process.platform);
+        return /(linux|freebsd)/.test(process.platform);
     },
     isWindows() {
         return /win32/.test(process.platform);
