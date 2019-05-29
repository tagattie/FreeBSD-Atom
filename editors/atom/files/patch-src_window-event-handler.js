--- src/window-event-handler.js.orig	2019-05-22 03:44:37 UTC
+++ src/window-event-handler.js
@@ -38,7 +38,7 @@ class WindowEventHandler {
       'window:toggle-dev-tools': this.handleWindowToggleDevTools
     }))
 
-    if (['win32', 'linux'].includes(process.platform)) {
+    if (['win32', 'linux', 'freebsd'].includes(process.platform)) {
       this.subscriptions.add(this.atomEnvironment.commands.add(this.window,
         {'window:toggle-menu-bar': this.handleWindowToggleMenuBar})
       )
