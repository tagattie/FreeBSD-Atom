--- node_modules/github/lib/git-shell-out-strategy.js.orig	2019-08-21 13:55:10 UTC
+++ node_modules/github/lib/git-shell-out-strategy.js
@@ -189,7 +189,7 @@ export default class GitShellOutStrategy {
         env.SSH_ASKPASS = normalizeGitHelperPath(gitTempDir.getAskPassSh());
         env.GIT_ASKPASS = normalizeGitHelperPath(gitTempDir.getAskPassSh());
 
-        if (process.platform === 'linux') {
+        if (process.platform === 'linux' || process.platform === 'freebsd') {
           env.GIT_SSH_COMMAND = gitTempDir.getSshWrapperSh();
         } else {
           env.GIT_SSH_COMMAND = process.env.GIT_SSH_COMMAND;
