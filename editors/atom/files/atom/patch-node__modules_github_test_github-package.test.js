--- node_modules/github/test/github-package.test.js.orig	2019-12-27 06:39:15 UTC
+++ node_modules/github/test/github-package.test.js
@@ -644,7 +644,7 @@ describe('GithubPackage', function() {
     });
 
     it('refreshes the appropriate Repository and Atom GitRepository when a file is changed in workspace 1', async function() {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         this.skip();
       }
       this.retries(5); // FLAKE
@@ -656,7 +656,7 @@ describe('GithubPackage', function() {
     });
 
     it('refreshes the appropriate Repository and Atom GitRepository when a file is changed in workspace 2', async function() {
-      if (process.platform === 'linux') {
+      if (process.platform === 'linux' || process.platform === 'freebsd') {
         this.skip();
       }
       this.retries(5); // FLAKE
