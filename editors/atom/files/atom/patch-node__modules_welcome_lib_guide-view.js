--- node_modules/welcome/lib/guide-view.js.orig	2019-03-25 13:58:31 UTC
+++ node_modules/welcome/lib/guide-view.js
@@ -281,7 +281,7 @@ export default class GuideView {
   getApplicationMenuName () {
     if (process.platform === 'darwin') {
       return 'Atom'
-    } else if (process.platform === 'linux') {
+    } else if (process.platform === 'linux' || process.platform === 'freebsd') {
       return 'Edit'
     } else {
       return 'File'
