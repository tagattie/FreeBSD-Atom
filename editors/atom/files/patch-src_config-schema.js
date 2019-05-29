--- src/config-schema.js.orig	2019-05-22 03:44:37 UTC
+++ src/config-schema.js
@@ -558,11 +558,11 @@ const configSchema = {
   }
 }
 
-if (['win32', 'linux'].includes(process.platform)) {
+if (['win32', 'linux', 'freebsd'].includes(process.platform)) {
   configSchema.core.properties.autoHideMenuBar = {
     type: 'boolean',
     default: false,
-    description: 'Automatically hide the menu bar and toggle it by pressing Alt. This is only supported on Windows & Linux.'
+    description: 'Automatically hide the menu bar and toggle it by pressing Alt. This is only supported on Windows, Linux & FreeBSD.'
   }
 }
 
