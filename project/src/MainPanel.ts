class MainPanel {
    private _view: fairygui.GComponent;
    private _list: fairygui.GList;

    public constructor() {        
        fairygui.UIPackage.addPackage("test");

        this._view = fairygui.UIPackage.createObject("test", "clickBtn").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        let boss = fairygui.UIPackage.createObject("test", "boss").asCom;
        boss.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        let txt = this._view.getChild("n1").asTextField;

        let btn = this._view.getChild("n0").asButton;
        btn.addClickListener(function () {
            btn.visible = false;
            txt.visible = false;
            fairygui.GRoot.inst.addChild(boss);
            boss.getTransition("t0").play();
        }, this)

        console.log(fairygui.GRoot.inst.width)
        fairygui.GRoot.inst.addChild(this._view);
    }
}
