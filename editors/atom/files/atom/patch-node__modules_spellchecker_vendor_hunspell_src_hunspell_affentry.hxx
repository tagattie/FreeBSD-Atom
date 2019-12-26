--- node_modules/spellchecker/vendor/hunspell/src/hunspell/affentry.hxx.orig	1985-10-26 08:15:00 UTC
+++ node_modules/spellchecker/vendor/hunspell/src/hunspell/affentry.hxx
@@ -27,7 +27,7 @@ class LIBHUNSPELL_DLL_EXPORTED PfxEntry : protected Af
   struct hentry *      checkword(const char * word, int len, char in_compound, 
                             const FLAG needflag = FLAG_NULL);
 
-  struct hentry *      check_twosfx(const char * word, int len, char in_compound, const FLAG needflag = NULL);
+  struct hentry *      check_twosfx(const char * word, int len, char in_compound, const FLAG needflag = 0);
 
   char *      check_morph(const char * word, int len, char in_compound,
                             const FLAG needflag = FLAG_NULL);
@@ -90,7 +90,7 @@ class LIBHUNSPELL_DLL_EXPORTED SfxEntry : protected Af
 //                    const FLAG cclass = FLAG_NULL, const FLAG needflag = FLAG_NULL, char in_compound=IN_CPD_NOT);
                     const FLAG cclass = FLAG_NULL, const FLAG needflag = FLAG_NULL, const FLAG badflag = 0);
 
-  struct hentry *   check_twosfx(const char * word, int len, int optflags, PfxEntry* ppfx, const FLAG needflag = NULL);
+  struct hentry *   check_twosfx(const char * word, int len, int optflags, PfxEntry* ppfx, const FLAG needflag = 0);
 
   char *      check_twosfx_morph(const char * word, int len, int optflags,
                  PfxEntry* ppfx, const FLAG needflag = FLAG_NULL);
