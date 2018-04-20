class Utils {

    public constructor() {

    }

    public static enterScene(sceneName: any) {
        let numChildren: number = fairygui.GRoot.inst.nativeStage.numChildren;

        fairygui.GRoot.inst.removeChildren(0, numChildren, true);

        if (sceneName['getView']) { fairygui.GRoot.inst.addChild(sceneName['getView']()); }
    }
}