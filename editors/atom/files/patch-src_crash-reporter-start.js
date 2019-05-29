--- src/crash-reporter-start.js.orig	2019-05-22 03:44:37 UTC
+++ src/crash-reporter-start.js
@@ -1,10 +1,2 @@
 module.exports = function (extra) {
-  const {crashReporter} = require('electron')
-  crashReporter.start({
-    productName: 'Atom',
-    companyName: 'GitHub',
-    submitURL: 'https://crashreporter.atom.io',
-    uploadToServer: false,
-    extra: extra
-  })
 }
