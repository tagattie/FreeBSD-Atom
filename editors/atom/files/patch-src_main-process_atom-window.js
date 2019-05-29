--- src/main-process/atom-window.js.orig	2019-05-22 03:44:37 UTC
+++ src/main-process/atom-window.js
@@ -49,7 +49,7 @@ class AtomWindow extends EventEmitter {
 
     // Don't set icon on Windows so the exe's ico will be used as window and
     // taskbar's icon. See https://github.com/atom/atom/issues/4811 for more.
-    if (process.platform === 'linux') options.icon = ICON_PATH
+    if (process.platform === 'linux' || process.platform === 'freebsd') options.icon = ICON_PATH
     if (this.shouldAddCustomTitleBar()) options.titleBarStyle = 'hidden'
     if (this.shouldAddCustomInsetTitleBar()) options.titleBarStyle = 'hiddenInset'
     if (this.shouldHideTitleBar()) options.frame = false
