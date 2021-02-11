--- src/main-process/atom-application.js.orig	2020-07-10 15:25:53 UTC
+++ src/main-process/atom-application.js
@@ -458,7 +458,7 @@ module.exports = class AtomApplication extends EventEm
       if (this.applicationMenu != null) {
         this.applicationMenu.enableWindowSpecificItems(false);
       }
-      if (['win32', 'linux'].includes(process.platform)) {
+      if (['win32', 'linux', 'freebsd'].includes(process.platform)) {
         app.quit();
         return;
       }
