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
/**
 * Created by CHanning on 2014/9/18.
 */
var GameOverView = (function (_super) {
    __extends(GameOverView, _super);
    function GameOverView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    GameOverView.prototype.initView = function () {
        GameData.overIsWin = false;
        switch (GameData.curScene) {
            case 1:
                this.str = "gameOver1Image";
                break;
            case 2:
                this.str = "gameOver2Image";
                break;
            case 3:
                this.str = "gameOver3Image";
                break;
            case 4:
                this.str = "gameOver4Image";
                break;
        }
        var bg = ResourceUtils.createBitmapByName(this.str);
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        SoundUtils.instance().playGameover();
        this.addChild(bg);
        this.share = new ShareView();
        this.addChild(this.share);
        this.share.visible = false;
        egret.Tween.get(this.share).wait(2000).call(this.showShareView, this);
    };
    GameOverView.prototype.showShareView = function () {
        this.share.visible = true;
    };
    return GameOverView;
}(egret.Sprite));
__reflect(GameOverView.prototype, "GameOverView");
