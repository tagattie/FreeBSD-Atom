--- src/text-editor-component.js.orig	2021-04-09 16:13:53 UTC
+++ src/text-editor-component.js
@@ -1797,7 +1797,7 @@ module.exports = class TextEditorComponent {
     // the paste event. And since we don't use the `paste` event for any
     // behavior in Atom, we can no-op the event to eliminate this issue.
     // See https://github.com/atom/atom/pull/15183#issue-248432413.
-    if (this.getPlatform() === 'linux') event.preventDefault();
+    if (this.getPlatform() === 'linux' || this.getPlatform() === 'freebsd') event.preventDefault();
   }
 
   didTextInput(event) {
@@ -1962,7 +1962,7 @@ module.exports = class TextEditorComponent {
       // contents of the selection clipboard will be dispatched by the browser
       // automatically on mouseup if editor.selectionClipboard is set to true.
       if (
-        platform === 'linux' &&
+        (platform === 'linux' || platform === 'freebsd') &&
         this.isInputEnabled() &&
         atom.config.get('editor.selectionClipboard')
       )
@@ -2832,7 +2832,7 @@ module.exports = class TextEditorComponent {
   didChangeSelectionRange() {
     const { model } = this.props;
 
-    if (this.getPlatform() === 'linux') {
+    if (this.getPlatform() === 'linux' || this.getPlatform() === 'freebsd') {
       if (this.selectionClipboardImmediateId) {
         clearImmediate(this.selectionClipboardImmediateId);
       }
