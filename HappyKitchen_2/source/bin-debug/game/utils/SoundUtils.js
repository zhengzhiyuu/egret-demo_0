var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Administrator on 2014/9/22.
 */
var SoundUtils = (function () {
    function SoundUtils() {
        if (SoundUtils._instance != null)
            throw new Error("singleton");
    }
    SoundUtils.instance = function () {
        return this._instance == null ? this._instance = new SoundUtils() : this._instance;
    };
    SoundUtils.prototype.initSound = function () {
        this.bgSound = new SoundBase("bgSound");
        this.gameoverSound = new SoundBase("gameoverSound");
        this.clearSound = new SoundBase("clearSound");
        this.clickSound = new SoundBase("correctSound");
        this.clickBuSound = new SoundBase("clickSound");
        this.endSound = new SoundBase("endSound");
        this.errorSound = new SoundBase("errorSound");
        this.readygoSound = new SoundBase("readygoSound");
        this.semiclearSound = new SoundBase("semiclearSound");
        this.timewarningSound = new SoundBase("timewarningSound");
        //        this.readygoSound.addEventListener("end",this.playBgMusic);
        //        this.clickSound.addEventListener("end",this.playBgMusic);
        //        this.clickBuSound.addEventListener("end",this.playBgMusic);
        //        this.errorSound.addEventListener("end",this.playBgMusic);
        //        this.semiclearSound.addEventListener("end",this.playBgMusic);
    };
    //    private playBgMusic(e:egret.Sound):void
    //    {
    //        this.playBg();
    //    }
    SoundUtils.prototype.playBg = function () {
        if (GameData.closeBgMusic) {
            this.bgSound.pause();
            return;
        }
        this.bgSound.play();
        this.bgSound.setLoop(1);
    };
    SoundUtils.prototype.stopBg = function () {
        this.bgSound.pause();
    };
    SoundUtils.prototype.stopTimer = function () {
        this.timewarningSound.pause();
    };
    SoundUtils.prototype.playClear = function () {
        if (GameData.closeMusic)
            return;
        this.endSound.play();
    };
    SoundUtils.prototype.playClick = function () {
        if (GameData.closeMusic)
            return;
        this.clickSound.play();
    };
    SoundUtils.prototype.playbu = function () {
        if (GameData.closeMusic)
            return;
        this.clickBuSound.play();
    };
    SoundUtils.prototype.playEnd = function () {
        if (GameData.closeMusic)
            return;
        this.clearSound.play();
    };
    SoundUtils.prototype.playError = function () {
        if (GameData.closeMusic)
            return;
        this.errorSound.play();
    };
    SoundUtils.prototype.playGameover = function () {
        if (GameData.closeMusic)
            return;
        this.gameoverSound.play();
    };
    SoundUtils.prototype.playReadyGo = function () {
        if (GameData.closeMusic)
            return;
        //this.readygoSound.play();
        console.log("called playready go");
    };
    SoundUtils.prototype.playSemiclear = function () {
        if (GameData.closeMusic)
            return;
        this.semiclearSound.play();
    };
    SoundUtils.prototype.playTimewarningSound = function () {
        if (GameData.closeMusic)
            return;
        this.timewarningSound.play();
        this.timewarningSound.setLoop(1);
    };
    return SoundUtils;
}());
__reflect(SoundUtils.prototype, "SoundUtils");
