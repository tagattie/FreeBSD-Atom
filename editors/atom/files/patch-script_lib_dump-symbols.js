--- script/lib/dump-symbols.js.orig	2019-05-22 03:44:37 UTC
+++ script/lib/dump-symbols.js
@@ -6,8 +6,8 @@ const path = require('path')
 
 const CONFIG = require('../config')
 module.exports = function () {
-  if (process.platform === 'win32') {
-    console.log('Skipping symbol dumping because minidump is not supported on Windows'.gray)
+  if (process.platform === 'win32' || process.platform === 'freebsd') {
+    console.log('Skipping symbol dumping because minidump is not supported on Windows or FreeBSD'.gray)
     return Promise.resolve()
   } else {
     console.log(`Dumping symbols in ${CONFIG.symbolsPath}`)
