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
 * Created by Channing on 2014/9/17.
 */
var HelpView = (function (_super) {
    __extends(HelpView, _super);
    function HelpView() {
        var _this = _super.call(this) || this;
        _this.initView();
        return _this;
    }
    HelpView.prototype.initView = function () {
        var bg = ResourceUtils.createBitmapByName("gameinfoImage");
        bg.width = Const.SCENT_WIDTH;
        bg.height = Const.SCENT_HEIGHT;
        bg.touchEnabled = true;
        this.addChild(bg);
        var start_btn = new MyButton("start1GameBtnImage", "start1GameBtnImage");
        this.addChild(start_btn);
        var _swidth = Const.SCENT_WIDTH / 2 - start_btn.width / 2;
        var _sheight = Const.SCENT_HEIGHT - start_btn.height - 20;
        start_btn.x = _swidth;
        start_btn.y = _sheight;
        start_btn.setClick(this.showStartView.bind(this));
    };
    HelpView.prototype.removeAll = function () {
        this.removeChildren();
    };
    HelpView.prototype.showStartView = function () {
        GameSceneView.game.start();
    };
    return HelpView;
}(egret.Sprite));
__reflect(HelpView.prototype, "HelpView");
