--- src/main-process/auto-update-manager.js.orig	2019-05-22 03:44:37 UTC
+++ src/main-process/auto-update-manager.js
@@ -85,6 +85,7 @@ class AutoUpdateManager extends EventEmitter {
         }
         break
       case 'linux':
+      case 'freebsd':
         this.setState(UnsupportedState)
     }
   }
