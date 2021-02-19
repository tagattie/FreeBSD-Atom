--- node_modules/tree-view/spec/tree-view-package-spec.coffee.orig	2020-10-29 14:16:56 UTC
+++ node_modules/tree-view/spec/tree-view-package-spec.coffee
@@ -5068,7 +5068,7 @@ describe "TreeView", ->
         treeView.rootDragAndDrop.onDragStart(dragStartEvent)
 
         expect(dragStartEvent.dataTransfer.getData("text/plain")).toEqual gammaDirPath
-        if process.platform in ['darwin', 'linux']
+        if process.platform in ['darwin', 'linux', 'freebsd']
           expect(dragStartEvent.dataTransfer.getData("text/uri-list")).toEqual "file://#{gammaDirPath}"
 
     describe "when a root folder is dropped from another Atom window", ->
