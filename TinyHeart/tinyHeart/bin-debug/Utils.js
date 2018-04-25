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
    Utils.getAngle = function (px, py, mx, my) {
        var x = Math.abs(px - mx);
        var y = Math.abs(py - my);
        var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        var cos = y / z;
        var radina = Math.acos(cos); //用反三角函数求弧度
        var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度
        if (mx > px && my > py) {
            angle = 180 - angle;
        }
        if (mx == px && my > py) {
            angle = 180;
        }
        if (mx > px && my == py) {
            angle = 90;
        }
        if (mx < px && my > py) {
            angle = 180 + angle;
        }
        if (mx < px && my == py) {
            angle = 270;
        }
        if (mx < px && my < py) {
            angle = 360 - angle;
        }
        return angle;
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
