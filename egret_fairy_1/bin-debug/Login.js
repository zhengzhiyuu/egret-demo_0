var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Login = (function () {
    function Login() {
        fairygui.UIPackage.addPackage("Login");
        this._view = fairygui.UIPackage.createObject("Login", "Main").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
    }
    Login.prototype.getView = function () {
        return this._view;
    };
    return Login;
}());
__reflect(Login.prototype, "Login");
