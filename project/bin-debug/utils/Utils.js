var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Utils = (function (_super) {
    __extends(Utils, _super);
    function Utils() {
        return _super.call(this) || this;
    }
    Utils.prototype.clearPrevBitmap = function () {
        while (this.numChildren) {
            this.removeChildAt(0);
        }
    };
    Utils.createBitMapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Utils.touchBegin = function (obj, func) {
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, func, this);
    };
    return Utils;
}(egret.Sprite));
__reflect(Utils.prototype, "Utils");
