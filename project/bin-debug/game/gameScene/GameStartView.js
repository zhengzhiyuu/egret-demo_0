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
var GameStartView = (function (_super) {
    __extends(GameStartView, _super);
    function GameStartView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    GameStartView.prototype.initView = function () {
        var bg = Utils.createBitMapByName('load_bg_jpg');
        this.addChild(bg);
        bg.width = Const.SCENE_WIDTH;
        bg.height = Const.SCENE_HEIGHT;
        var startBtn = Utils.createBitMapByName('start_btn_png');
        this.addChild(startBtn);
        var startBtnX = Const.SCENE_WIDTH / 2 - startBtn.width / 2;
        var startBtnY = Const.SCENE_HEIGHT - startBtn.height - 140;
        startBtn.x = startBtnX;
        startBtn.y = startBtnY;
        startBtn.touchEnabled = true;
        Utils.touchBegin(startBtn, this.showGameHint);
        var getMore = Utils.createBitMapByName('getmore_png');
        this.addChild(getMore);
        var getMoreBtnX = Const.SCENE_WIDTH / 2 - getMore.width / 2;
        var getMoreBtnY = Const.SCENE_HEIGHT - getMore.height - 20;
        getMore.x = getMoreBtnX;
        getMore.y = getMoreBtnY;
    };
    GameStartView.prototype.showGameHint = function () {
        egret.log('game log');
    };
    return GameStartView;
}(egret.Sprite));
__reflect(GameStartView.prototype, "GameStartView");
