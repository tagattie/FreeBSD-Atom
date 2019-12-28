--- node_modules/text-buffer/node_modules/fs-admin/binding.gyp.orig	2019-12-27 07:00:04 UTC
+++ node_modules/text-buffer/node_modules/fs-admin/binding.gyp
@@ -37,7 +37,7 @@
             '$(SDKROOT)/System/Library/Frameworks/Security.framework',
           ],
         }],
-        ['OS=="linux"', {
+        ['OS=="linux" or OS=="freebsd"', {
           'sources': [
             'src/fs-admin-linux.cc',
           ],
