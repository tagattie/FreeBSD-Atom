--- src/config-schema.js.orig	2020-11-06 18:27:28 UTC
+++ src/config-schema.js
@@ -627,12 +627,12 @@ const configSchema = {
   }
 };
 
-if (['win32', 'linux'].includes(process.platform)) {
+if (['win32', 'linux', 'freebsd'].includes(process.platform)) {
   configSchema.core.properties.autoHideMenuBar = {
     type: 'boolean',
     default: false,
     description:
-      'Automatically hide the menu bar and toggle it by pressing Alt. This is only supported on Windows & Linux.'
+      'Automatically hide the menu bar and toggle it by pressing Alt. This is only supported on Windows, Linux & FreeBSD.'
   };
 }
 
