--- node_modules/tree-view/spec/tree-view-package-spec.coffee.orig	2020-09-14 19:30:31 UTC
+++ node_modules/tree-view/spec/tree-view-package-spec.coffee
@@ -5039,7 +5039,7 @@ describe "TreeView", ->
         treeView.rootDragAndDrop.onDragStart(dragStartEvent)
 
         expect(dragStartEvent.dataTransfer.getData("text/plain")).toEqual gammaDirPath
-        if process.platform in ['darwin', 'linux']
+        if process.platform in ['darwin', 'linux', 'freebsd']
           expect(dragStartEvent.dataTransfer.getData("text/uri-list")).toEqual "file://#{gammaDirPath}"
 
     describe "when a root folder is dropped from another Atom window", ->
