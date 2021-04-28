--- src/main-process/atom-window.js.orig	2021-04-09 16:13:53 UTC
+++ src/main-process/atom-window.js
@@ -67,7 +67,7 @@ module.exports = class AtomWindow extends EventEmitter
 
     // Don't set icon on Windows so the exe's ico will be used as window and
     // taskbar's icon. See https://github.com/atom/atom/issues/4811 for more.
-    if (process.platform === 'linux')
+    if (process.platform === 'linux' || process.platform === 'freebsd')
       options.icon = nativeImage.createFromPath(ICON_PATH);
     if (this.shouldAddCustomTitleBar()) options.titleBarStyle = 'hidden';
     if (this.shouldAddCustomInsetTitleBar())
