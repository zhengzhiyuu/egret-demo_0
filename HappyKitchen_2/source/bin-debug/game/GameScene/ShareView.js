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
 * Created by Administrator on 2014/9/24.
 */
var ShareView = (function (_super) {
    __extends(ShareView, _super);
    function ShareView() {
        var _this = _super.call(this) || this;
        _this.content = "";
        _this.initView();
        return _this;
    }
    ShareView.prototype.initView = function () {
        var spMask = new egret.Sprite();
        this.addChild(spMask);
        var mask = ResourceUtils.createBitmapByName("alphaBg");
        spMask.addChild(mask);
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);
        var bmp = ResourceUtils.createBitmapByName("endPopupImage");
        bmp.x = Const.SCENT_WIDTH / 2 - bmp.width / 2;
        bmp.y = Const.SCENT_HEIGHT / 2 - bmp.height / 2 - 20;
        this.thisContainer.addChild(bmp);
        this.spGengduo = new egret.Sprite();
        this.thisContainer.addChild(this.spGengduo);
        var gengduo = ResourceUtils.createBitmapByName("gengduoyouxiImage");
        this.spGengduo.addChild(gengduo);
        this.spGengduo.touchEnabled = true;
        this.spGengduo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
        this.spZaiLai = new egret.Sprite();
        this.thisContainer.addChild(this.spZaiLai);
        var zailai = ResourceUtils.createBitmapByName("zailaiyiciImage");
        this.spZaiLai.addChild(zailai);
        this.spZaiLai.touchEnabled = true;
        this.spZaiLai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStartView, this);
        this.spFenXiang = new egret.Sprite();
        this.thisContainer.addChild(this.spFenXiang);
        var fenxiang = ResourceUtils.createBitmapByName("fenxiangImage");
        this.spFenXiang.addChild(fenxiang);
        this.spFenXiang.touchEnabled = true;
        this.spFenXiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toShareView, this);
        this.spGengduo.y = 660;
        this.spFenXiang.y = 660;
        this.spZaiLai.y = 660;
        this.spGengduo.x = 10;
        this.spZaiLai.x = 168;
        this.spFenXiang.x = 325;
        //if(!EgretShare.canShare){
        //    this.spGengduo.x = 90;
        //    this.spZaiLai.x = 245;
        //    this.thisContainer.removeChild(this.spFenXiang);
        //}
        if (egret.RuntimeType.NATIVE == egret.Capabilities.runtimeType) {
            this.thisContainer.removeChild(this.spFenXiang);
            this.thisContainer.removeChild(this.spGengduo);
        }
        if (GameData.curScene == 5) {
            var binggan = ResourceUtils.createBitmapByName("binggan2Image");
            var word = ResourceUtils.createBitmapByName("word1Image");
            GameData.winNum = 0;
            this.content = "我亲手做的美味小饼干，快来看看！";
            //EgretShare.setShareContent(this.content);
        }
        else {
            var binggan = ResourceUtils.createBitmapByName("binggan1Image");
            var word = ResourceUtils.createBitmapByName("word2Image");
            GameData.winNum = 0;
            this.content = "哎呀！做饼干也不是一件容易的事情啊！求帮助！";
            //EgretShare.setShareContent(this.content);
        }
        this.thisContainer.addChild(binggan);
        binggan.x = Const.SCENT_WIDTH / 2 - binggan.width / 2;
        binggan.y = 300;
        this.thisContainer.addChild(word);
        word.x = Const.SCENT_WIDTH / 2 - word.width / 2;
        word.y = 500;
        var sorce = new SpecialNumber("number_");
        sorce.setValue(GameData.sorce + "");
        sorce.y = 200;
        sorce.x = Const.SCENT_WIDTH / 2 - sorce.width / 2;
        this.thisContainer.addChild(sorce);
        this.sp = new egret.Sprite();
        this.addChild(this.sp);
        var bg = ResourceUtils.createBitmapByName("shareImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.sp.addChild(bg);
        this.sp.visible = false;
        this.sp.touchEnabled = true;
        this.sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchShare, this);
        this.thisContainer.scaleX = this.thisContainer.scaleY = 0.9;
        this.thisContainer.x = Const.SCENT_WIDTH / 2 - this.thisContainer.width / 2 + 30;
        this.thisContainer.y = Const.SCENT_HEIGHT / 2 - this.thisContainer.height / 2;
    };
    ShareView.prototype.toShareView = function (e) {
        //EgretShare.share();
    };
    ShareView.prototype.toGengDuoView = function (e) {
        //EgretShare.moreGame();
        this.spGengduo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
    };
    ShareView.prototype.toGameStartView = function (e) {
        GameData.sorce = 0;
        GameData.winNum = 0;
        GameData.isShow = false;
        GameData.curScene = 1;
        GameData.overIsWin = false;
        this.spGengduo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGengDuoView, this);
        this.spFenXiang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toShareView, this);
        this.spZaiLai.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGameStartView, this);
        this.removeChildren();
        if (this.parent)
            this.parent.removeChild(this);
        GameSceneView.game.showHome();
    };
    ShareView.prototype.touchShare = function (e) {
        this.sp.visible = false;
    };
    return ShareView;
}(egret.Sprite));
__reflect(ShareView.prototype, "ShareView");
