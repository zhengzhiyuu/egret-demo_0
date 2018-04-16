var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        fairygui.UIPackage.addPackage("test");
        this._view = fairygui.UIPackage.createObject("test", "clickBtn").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        var boss = fairygui.UIPackage.createObject("test", "boss").asCom;
        boss.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        var txt = this._view.getChild("n1").asTextField;
        var btn = this._view.getChild("n0").asButton;
        btn.addClickListener(function () {
            btn.visible = false;
            txt.visible = false;
            fairygui.GRoot.inst.addChild(boss);
            boss.getTransition("t0").play();
        }, this);
        console.log(fairygui.GRoot.inst.width);
        fairygui.GRoot.inst.addChild(this._view);
    }
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
