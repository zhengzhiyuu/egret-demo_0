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
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        var _this = _super.call(this) || this;
        _this.number = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initMain, _this);
        return _this;
    }
    GameMainView.prototype.initMain = function () {
        this.showHint(this.number);
    };
    GameMainView.prototype.showHint = function (index) {
        if (index === void 0) { index = 0; }
        switch (index) {
            case 0:
                this.gameHint = Utils.createBitMapByName('gameinfo_1_jpg');
                break;
            case 1:
                this.gameHint = Utils.createBitMapByName('gameinfo_2_jpg');
                break;
            case 2:
                this.gameHint = Utils.createBitMapByName('gameinfo_3_jpg');
                break;
            case 3:
                this.gameHint = Utils.createBitMapByName('gameinfo_4_jpg');
                break;
        }
        this.addChild(this.gameHint);
        this.gameHint.width = Const.SCENE_WIDTH;
        this.gameHint.height = Const.SCENE_HEIGHT;
        this.addChild(this.gameHint);
        this.gameHint.touchEnabled = true;
        Utils.touchBegin(this.gameHint, this.changeScene.bind(this));
        var hintTop = Utils.createBitMapByName('hint_top_png');
        this.addChild(hintTop);
        hintTop.width = hintTop.width * 1.5;
        hintTop.height = hintTop.height * 1.5;
        hintTop.x = Const.SCENE_WIDTH / 2 - hintTop.width / 2;
        hintTop.y = 20;
        var nextBtn = Utils.createBitMapByName('startGame_btn_png');
        this.addChild(nextBtn);
        nextBtn.x = Const.SCENE_WIDTH / 2 - nextBtn.width / 2;
        nextBtn.y = Const.SCENE_HEIGHT - nextBtn.height - 20;
    };
    GameMainView.prototype.changeScene = function () {
        switch (this.number) {
            case 0:
                this.removeChildren();
                this.gameHint.touchEnabled = false;
                this.sceneNum = new GameSceneOne();
                this.addChild(this.sceneNum);
                break;
        }
    };
    return GameMainView;
}(egret.Sprite));
__reflect(GameMainView.prototype, "GameMainView");
