class Home {
    private _view: fairygui.GComponent;

    public constructor() {
        fairygui.UIPackage.addPackage("Home");
        this._view = fairygui.UIPackage.createObject("Home", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
    }

    public getView(): fairygui.GComponent {
        return this._view;
    }
}