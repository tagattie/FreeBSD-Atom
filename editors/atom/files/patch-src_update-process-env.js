--- src/update-process-env.js.orig	2019-05-22 03:44:37 UTC
+++ src/update-process-env.js
@@ -10,7 +10,8 @@ const ENVIRONMENT_VARIABLES_TO_PRESERVE = new Set([
 
 const PLATFORMS_KNOWN_TO_WORK = new Set([
   'darwin',
-  'linux'
+  'linux',
+  'freebsd'
 ])
 
 async function updateProcessEnv (launchEnv) {
