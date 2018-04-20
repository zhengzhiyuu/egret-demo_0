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
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
