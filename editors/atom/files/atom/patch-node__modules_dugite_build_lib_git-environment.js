--- node_modules/dugite/build/lib/git-environment.js.orig	1985-10-26 08:15:00 UTC
+++ node_modules/dugite/build/lib/git-environment.js
@@ -4,6 +4,7 @@ const path = require("path");
 function resolveEmbeddedGitDir() {
     if (process.platform === 'darwin' ||
         process.platform === 'linux' ||
+	process.platform === 'freebsd' ||
         process.platform === 'android' ||
         process.platform === 'win32') {
         const s = path.sep;
@@ -23,6 +24,9 @@ function resolveGitDir() {
     if (process.env.LOCAL_GIT_DIRECTORY != null) {
         return path.resolve(process.env.LOCAL_GIT_DIRECTORY);
     }
+    else if (process.platform === 'freebsd') {
+        return '/usr/local'
+    }
     else {
         return resolveEmbeddedGitDir();
     }
@@ -94,13 +98,13 @@ function setupEnvironment(environmentVariables) {
             delete env.Path;
         }
     }
-    if (process.platform === 'darwin' || process.platform === 'linux') {
+    if (process.platform === 'darwin' || process.platform === 'linux' || process.platform === 'freebsd') {
         // templates are used to populate your .git folder
         // when a repository is initialized locally
         const templateDir = `${gitDir}/share/git-core/templates`;
         env.GIT_TEMPLATE_DIR = templateDir;
     }
-    if (process.platform === 'linux') {
+    if (process.platform === 'linux' || process.platform === 'freebsd') {
         // when building Git for Linux and then running it from
         // an arbitrary location, you should set PREFIX for the
         // process to ensure that it knows how to resolve things
@@ -116,4 +120,4 @@ function setupEnvironment(environmentVariables) {
     return { env, gitLocation };
 }
 exports.setupEnvironment = setupEnvironment;
-//# sourceMappingURL=git-environment.js.map
\ No newline at end of file
+//# sourceMappingURL=git-environment.js.map
