--- configure.py.orig	2019-06-04 11:57:27 UTC
+++ configure.py
@@ -699,7 +699,7 @@ def get_nasm_version(asm):
 
 def get_llvm_version(cc):
   return get_version_helper(
-    cc, r"(^(?:FreeBSD )?clang version|based on LLVM) ([3-9]\.[0-9]+)")
+    cc, r"(^(?:FreeBSD )?clang version|based on LLVM) ([0-9]+\.[0-9]+)")
 
 def get_xcode_version(cc):
   return get_version_helper(
