--- script/node_modules/electron-packager/src/copy-filter.js.orig	2021-02-15 12:21:54 UTC
+++ script/node_modules/electron-packager/src/copy-filter.js
@@ -21,7 +21,7 @@ function populateIgnoredPaths (opts) {
     } else {
       opts.ignore = [].concat(DEFAULT_IGNORES)
     }
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
       opts.ignore.push(common.baseTempDir(opts))
     }
 
