class MainPanel {
    private _view: fairygui.GComponent;
    private _list: fairygui.GList;

    public constructor() {
        this._view = fairygui.UIPackage.createObject("test","Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width,fairygui.GRoot.inst.height);

        fairygui.GRoot.inst.addChild(this._view);
    }
}
