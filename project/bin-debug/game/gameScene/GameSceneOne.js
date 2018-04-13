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
        ready.scaleX = 0.8;
        ready.scaleY = 0.8;
        ready.anchorOffsetX = ready.width / 2;
        ready.anchorOffsetY = ready.height / 2;
        ready.x = Const.SCENE_WIDTH / 2;
        ready.y = 450;
        var go = Utils.createBitMapByName('go_png');
        go.scaleX = 0.8;
        go.scaleY = 0.8;
        go.anchorOffsetX = go.width / 2;
        go.anchorOffsetY = go.height / 2;
        go.x = Const.SCENE_WIDTH / 2;
        go.y = 450;
        var self = this;
        var tw = egret.Tween.get(ready, {
            onChange: function () {
                if (ready.scaleX === 1) {
                    self.removeChild(ready);
                    self.addChild(go);
                    var tw_1 = egret.Tween.get(go, {
                        onChange: function () {
                            if (go.scaleX === 1) {
                                self.removeChild(go);
                            }
                        },
                        onChangeObj: go
                    });
                    tw_1.to({
                        scaleX: 1,
                        scaleY: 1
                    }, 600);
                }
            },
            onChangeObj: ready
        });
        tw.to({
            scaleX: 1,
            scaleY: 1
        }, 500);
    };
    return GameSceneOne;
}(egret.Sprite));
__reflect(GameSceneOne.prototype, "GameSceneOne");
