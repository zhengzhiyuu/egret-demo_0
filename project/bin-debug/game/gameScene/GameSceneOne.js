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
var GameSceneOne = (function (_super) {
    __extends(GameSceneOne, _super);
    function GameSceneOne() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameSceneOne.prototype.init = function () {
        var bg = Utils.createBitMapByName('gaming_bg_jpg');
        this.addChild(bg);
        bg.width = Const.SCENE_WIDTH;
        bg.height = Const.SCENE_HEIGHT;
        var ready = Utils.createBitMapByName('ready_png');
        this.addChild(ready);
        ready.x = Const.SCENE_WIDTH / 2 - ready.width / 2;
        ready.y = 400;
    };
    return GameSceneOne;
}(egret.Sprite));
__reflect(GameSceneOne.prototype, "GameSceneOne");
