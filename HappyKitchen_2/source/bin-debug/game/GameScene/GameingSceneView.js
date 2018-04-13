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
/*** Created by Administrator on 2014/9/17. */
var GameingSceneView = (function (_super) {
    __extends(GameingSceneView, _super);
    function GameingSceneView() {
        return _super.call(this) || this;
    }
    GameingSceneView.prototype.showGame = function (index) {
        this.num = index;
        switch (index) {
            case 1:
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_1_Image");
                this.addChild(this.thisContainer);
                break;
            case 2:
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_2_Image");
                this.addChild(this.thisContainer);
                break;
            case 3:
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_3_Image");
                this.addChild(this.thisContainer);
                break;
            case 4:
                this.thisContainer = ResourceUtils.createBitmapByName("gameinfo_4_Image");
                this.addChild(this.thisContainer);
                break;
        }
        var start_btn = ResourceUtils.createBitmapByName("startGameBtnImage");
        start_btn.scaleX = start_btn.scaleY = 1.4;
        this.addChild(start_btn);
        var _swidth = Const.SCENT_WIDTH / 2 - start_btn.width / 2 - 10;
        var _sheight = Const.SCENT_HEIGHT - start_btn.height - 20;
        start_btn.x = _swidth;
        start_btn.y = _sheight;
        var kuang = StarlingSwfFactory.getInstance().makeMc("kuang");
        this.addChild(kuang);
        kuang.x = Const.SCENT_WIDTH / 2;
        kuang.y = kuang.height * 1.3;
        kuang.goToPlay("1");
        kuang.setCompleteAction(this.complete, this);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showStartView, this);
    };
    GameingSceneView.prototype.complete = function () {
        this.isStartGameBoo = true;
    };
    GameingSceneView.prototype.removeAl = function () {
        this.touchEnabled = false;
        ;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showStartView, this);
    };
    GameingSceneView.prototype.showStartView = function (e) {
        if (!this.isStartGameBoo)
            return;
        switch (this.num) {
            case 1:
                this.removeChildren();
                this.removeAl();
                var game1 = new GameFightOneScene();
                this.addChild(game1);
                break;
            case 2:
                this.removeChildren();
                this.removeAl();
                var game2 = new GameFightTwoScene();
                this.addChild(game2);
                break;
            case 3:
                this.removeChildren();
                this.removeAl();
                var game3 = new GameFightThreeScene();
                this.addChild(game3);
                break;
            case 4:
                this.removeChildren();
                this.removeAl();
                var game4 = new GameFightFourScene();
                this.addChild(game4);
                break;
        }
    };
    return GameingSceneView;
}(egret.Sprite));
__reflect(GameingSceneView.prototype, "GameingSceneView");
