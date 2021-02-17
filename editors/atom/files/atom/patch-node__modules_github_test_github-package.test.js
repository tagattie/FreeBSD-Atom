--- node_modules/github/test/github-package.test.js.orig	2020-04-06 12:35:49 UTC
+++ node_modules/github/test/github-package.test.js
@@ -1063,7 +1063,7 @@ describe('GithubPackage', function() {
 
     describe('when a file change is made outside Atom in workspace 1', function() {
       beforeEach(function() {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
           this.skip();
         }
 
@@ -1081,7 +1081,7 @@ describe('GithubPackage', function() {
 
     describe('when a file change is made outside Atom in workspace 2', function() {
       beforeEach(function() {
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
           this.skip();
         }
 
