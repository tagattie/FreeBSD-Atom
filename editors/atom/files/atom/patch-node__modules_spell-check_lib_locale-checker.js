--- node_modules/spell-check/lib/locale-checker.js.orig	2021-04-28 06:41:59 UTC
+++ node_modules/spell-check/lib/locale-checker.js
@@ -114,6 +114,7 @@ class LocaleChecker {
                 searchPaths.push('/usr/share/hunspell');
                 searchPaths.push('/usr/share/myspell');
                 searchPaths.push('/usr/share/myspell/dicts');
+                searchPaths.push('/usr/local/share/hunspell');
             }
 
             if (env.isDarwin()) {
