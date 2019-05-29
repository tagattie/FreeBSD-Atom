--- src/main-process/atom-application.js.orig	2019-05-22 03:44:37 UTC
+++ src/main-process/atom-application.js
@@ -408,7 +408,7 @@ class AtomApplication extends EventEmitter {
       if (this.applicationMenu != null) {
         this.applicationMenu.enableWindowSpecificItems(false)
       }
-      if (['win32', 'linux'].includes(process.platform)) {
+      if (['win32', 'linux', 'freebsd'].includes(process.platform)) {
         app.quit()
         return
       }
