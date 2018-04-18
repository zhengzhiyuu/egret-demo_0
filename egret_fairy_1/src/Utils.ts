class Utils {

    public static enterScene(scene: any): void {
        let numChildren: number = fairygui.GRoot.inst.nativeStage.numChildren;

        fairygui.GRoot.inst.removeChildren(0, numChildren, true);
        if (scene["getView"]) { fairygui.GRoot.inst.addChild(scene.getView()); }
    }
}