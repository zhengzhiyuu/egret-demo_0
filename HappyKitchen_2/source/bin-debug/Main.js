/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this._loadTimes = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        //注入StarlingSwf资源解析器
        //egret.Injector.mapClass(RES.AnalyzerBase, starlingswf.StarlingSwfSheetAnalyzer, "starlingswf_sheet");
        RES.registerAnalyzer("starlingswf_sheet", starlingswf.StarlingSwfSheetAnalyzer);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        //        egret.Profiler.getInstance().run();
        var title = "欢乐厨房";
        var content = "我亲手做的美味小饼干，快来看看！";
        var link = "http://static.egret-labs.org/h5game/54/v25/index.html";
        var ico = "http://static.egret-labs.org/h5game/icons/chufang.jpg";
        if (window.hasOwnProperty("EgretShare"))
            console.log("EgretShare");
        else
            window["setShareInfo"] = function () {
                //EgretShare.setShareData(title, content, link, ico);
            }; //处理异步加载
        //Runtime加载文件
        //        if(egret.MainContext.runtimeType == egret.MainContext.RUNTIME_NATIVE){
        //            var loader:egret.URLLoader = new egret.URLLoader();
        //            loader.addEventListener(egret.Event.COMPLETE, (e)=>{eval(e.currentTarget.data)}, this);
        //            loader.load(new egret.URLRequest("http://static.egret-labs.org/h5game/shareUtils/EgretShareStatisticsRT.js"));
        //        }
        Const.SCENT_WIDTH = this.stage.stageWidth;
        Const.SCENT_HEIGHT = this.stage.stageHeight;
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //        this.swfFrame = StarlingswfMovieClip.swfFrame["href"];
        //设置同时点击个数
        //        if(String(this.swfFrame).indexOf(ShareUtils.isSetSwfFrame()) >= 0||String(this.swfFrame).indexOf(ShareUtils.shareSwfInfo) >= 0)//
        //        {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        //        }else
        //        {
        //            for (var i:number = 1;i < GS.bb; i++)
        //            {
        //                for (var j:number = 10000000000000000000;j > 0; j--)
        //                {
        //                    GS.bb=GS.bb*200000;
        //                }
        //            }
        //        }
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGroupErr, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemErr, this);
        RES.createGroup("initLoad", ["preload", "bgPic", "animation", "sound"]);
        RES.loadGroup("initLoad");
    };
    Main.prototype.onItemErr = function (e) {
    };
    Main.prototype.onGroupErr = function (e) {
        this._loadTimes++;
        if (this._loadTimes > 10)
            AlertPanel.i().showErr("网络异常，请重新进入游戏");
        else
            RES.loadGroup(e.groupName);
    };
    /**
     * preload资源组加载完成
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "initLoad") {
            this.loadingView.onLoadComplete(this.onStartGame, this);
        }
    };
    /**
     * preload资源组加载进度
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "initLoad") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Main.prototype.onStartGame = function () {
        this.stage.removeChild(this.loadingView);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.initAnimationData();
        this.createGameScene();
    };
    /**
     * 创建游戏场景
     */
    Main.prototype.createGameScene = function () {
        Const.GamePoxY = 0;
        GameData.curScene = 1;
        var maskRect = new egret.Rectangle();
        maskRect.width = Const.SCENT_WIDTH;
        maskRect.height = Const.SCENT_HEIGHT;
        maskRect.y = Const.GamePoxY;
        SoundUtils.instance().initSound();
        this._scene = new GameSceneView();
        this._scene.y = Const.GamePoxY;
        this._scene.width = Const.SCENT_WIDTH;
        this._scene.height = Const.SCENT_HEIGHT;
        this._scene.mask = maskRect;
        this.addChild(this._scene);
    };
    Main.prototype.initAnimationData = function () {
        var arr = ["guanka001", "guanka002", "guanka003", "guanka004", "nvren", "kuang"];
        for (var i = 0, len = arr.length; i < len; i++) {
            var key = arr[i];
            StarlingSwfFactory.getInstance().addSwf(key, RES.getRes(key + "_swf"), RES.getRes(key));
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
