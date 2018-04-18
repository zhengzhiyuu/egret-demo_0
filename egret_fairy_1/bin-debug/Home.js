var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Home = (function () {
    function Home() {
        fairygui.UIPackage.addPackage("Home");
        this._view = fairygui.UIPackage.createObject("Home", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
    }
    Home.prototype.getView = function () {
        return this._view;
    };
    return Home;
}());
__reflect(Home.prototype, "Home");
