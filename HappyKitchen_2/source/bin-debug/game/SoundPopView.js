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
 * Created by Administrator on 2014/9/22.
 */
var SoundPopView = (function (_super) {
    __extends(SoundPopView, _super);
    function SoundPopView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    SoundPopView.prototype.initView = function () {
        var spMask = new egret.Sprite();
        this.addChild(spMask);
        var mask = ResourceUtils.createBitmapByName("alphaBg");
        spMask.addChild(mask);
        spMask.touchEnabled = true;
        spMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
        this.spContainer = new egret.Sprite();
        this.addChild(this.spContainer);
        var bg = ResourceUtils.createBitmapByName("option1BgImage");
        this.spContainer.addChild(bg);
        var wd = Const.SCENT_WIDTH / 8;
        var hd = Const.SCENT_HEIGHT / 4;
        this.spContainer.x = wd;
        this.spContainer.y = hd;
        var zhinan = new egret.Sprite();
        this.spContainer.addChild(zhinan);
        var zhinanBmp = ResourceUtils.createBitmapByName("zhinanImage");
        zhinan.addChild(zhinanBmp);
        zhinan.x = this.spContainer.width / 2 - zhinan.width / 2;
        zhinan.y = 200;
        zhinan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHelp, this);
        zhinan.touchEnabled = true;
        this.helpSp = new egret.Sprite();
        this.addChild(this.helpSp);
        var close = new egret.Sprite();
        this.spContainer.addChild(close);
        var spclose = ResourceUtils.createBitmapByName("option7Image");
        close.addChild(spclose);
        close.touchEnabled = true;
        close.x = this.spContainer.width - close.width * 0.7;
        close.y = -close.height * 0.4;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePop, this);
        var soundBooBg = new egret.Sprite();
        this.spContainer.addChild(soundBooBg);
        this.spguanbg = ResourceUtils.createBitmapByName("option5Image");
        soundBooBg.addChild(this.spguanbg);
        this.spkaibg = ResourceUtils.createBitmapByName("option6Image");
        soundBooBg.addChild(this.spkaibg);
        this.spguanbg.x = 0;
        this.spkaibg.x = 30;
        soundBooBg.x = 182;
        soundBooBg.y = 84;
        soundBooBg.touchEnabled = true;
        soundBooBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBgHandler, this);
        var soundBoo = new egret.Sprite();
        this.spContainer.addChild(soundBoo);
        this.spguan = ResourceUtils.createBitmapByName("option5Image");
        soundBoo.addChild(this.spguan);
        this.spkai = ResourceUtils.createBitmapByName("option6Image");
        soundBoo.addChild(this.spkai);
        this.spguan.x = 0;
        this.spkai.x = 30;
        soundBoo.x = 182;
        soundBoo.y = 148;
        soundBoo.touchEnabled = true;
        soundBoo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        if (!GameData.closeBgMusic) {
            this.spguanbg.visible = false;
            this.spkaibg.visible = true;
        }
        else {
            this.spguanbg.visible = true;
            this.spkaibg.visible = false;
        }
        if (!GameData.closeMusic) {
            this.spguan.visible = false;
            this.spkai.visible = true;
        }
        else {
            this.spguan.visible = true;
            this.spkai.visible = false;
        }
    };
    SoundPopView.prototype.onClickHandler = function (e) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    SoundPopView.prototype.touchHelp = function (e) {
        if (this.helpSp.visible == false) {
            this.helpSp.visible = true;
            return;
        }
        var bg = ResourceUtils.createBitmapByName("gameinfoImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        this.helpSp.addChild(bg);
        var close_btn = new MyButton("closeGameBtnImage", "closeGameBtnImage");
        this.helpSp.addChild(close_btn);
        var _swidth = Const.SCENT_WIDTH / 2 - close_btn.width / 2;
        var _sheight = Const.SCENT_HEIGHT - close_btn.height - 20;
        close_btn.x = _swidth;
        close_btn.y = _sheight;
        close_btn.setClick(this.showStartView.bind(this));
    };
    SoundPopView.prototype.showStartView = function () {
        this.helpSp.visible = false;
    };
    SoundPopView.prototype.clickHandler = function (e) {
        if (!GameData.closeMusic) {
            this.spkai.visible = false;
            this.spguan.visible = true;
            GameData.closeMusic = true;
        }
        else {
            this.spkai.visible = true;
            this.spguan.visible = false;
            GameData.closeMusic = false;
        }
    };
    SoundPopView.prototype.clickBgHandler = function (e) {
        if (!GameData.closeBgMusic) {
            this.spguanbg.visible = true;
            this.spkaibg.visible = false;
            GameData.closeBgMusic = true;
            SoundUtils.instance().stopBg();
        }
        else {
            this.spguanbg.visible = false;
            this.spkaibg.visible = true;
            GameData.closeBgMusic = false;
            SoundUtils.instance().playBg();
        }
    };
    SoundPopView.prototype.closePop = function (e) {
        GameData.isClickBtn = false;
        this.visible = false;
        GameData.isPause = true;
        GameData.isStart = true;
    };
    return SoundPopView;
}(egret.Sprite));
__reflect(SoundPopView.prototype, "SoundPopView");
