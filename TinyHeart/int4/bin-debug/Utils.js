var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Utils.enterScene = function (sceneName) {
        var numChildren = fairygui.GRoot.inst.nativeStage.numChildren;
        fairygui.GRoot.inst.removeChildren(0, numChildren, true);
        if (sceneName['getView']) {
            fairygui.GRoot.inst.addChild(sceneName['getView']());
        }
    };
    Utils.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Utils.lerpDistance = function (aim, cur, ratio) {
        var delta = cur - aim;
        return aim + delta * ratio;
    };
    Utils.lerpAngle = function (a, b, t) {
        var d = b - a;
        if (d > Math.PI) {
            d = d - 2 * Math.PI * 360;
        }
        if (d < Math.PI) {
            d = d + 2 * Math.PI * 360;
        }
        return a + d * t;
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
