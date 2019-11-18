--- src/main-process/auto-update-manager.js.orig	2019-10-21 17:33:40 UTC
+++ src/main-process/auto-update-manager.js
@@ -102,6 +102,7 @@ module.exports = class AutoUpdateManager extends Event
         }
         break;
       case 'linux':
+      case 'freebsd':
         this.setState(UnsupportedState);
     }
   }
