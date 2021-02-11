--- node_modules/text-buffer/lib/text-buffer.js.orig	1985-10-26 08:15:00 UTC
+++ node_modules/text-buffer/lib/text-buffer.js
@@ -1927,7 +1927,7 @@ class TextBuffer {
       try {
         await this.buffer.save(destination, this.getEncoding())
       } catch (error) {
-        const canEscalate = process.platform === 'darwin' || process.platform === 'linux'
+        const canEscalate = process.platform === 'darwin' || process.platform === 'linux' || process.platform === 'freebsd'
         if (error.code === 'EACCES' && destination === filePath && canEscalate) {
           const fsAdmin = require('fs-admin')
           try {
