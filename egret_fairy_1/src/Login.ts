class Login {
    private _view: fairygui.GComponent;

    public constructor() {
        fairygui.UIPackage.addPackage("Login");
        this._view = fairygui.UIPackage.createObject("Login", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
    }

    public getView(): fairygui.GComponent {
        return this._view;
    }
}