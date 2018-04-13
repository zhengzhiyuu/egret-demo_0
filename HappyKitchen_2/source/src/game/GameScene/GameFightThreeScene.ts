/**
 * Created by Administrator on 2014/9/18.
 */
class GameFightThreeScene extends egret.Sprite{
    private showTimer:egret.TextField;
    private go:egret.Bitmap;
    private nogScaleX:number;
    private nogScaleY:number;
    private daoJiShiTotalTime:number = egret.getTimer()+1000*110;
    private bar:egret.Bitmap;
    private barMask:egret.Bitmap;

    private numTwo:egret.Bitmap;

    //游戏胜利结束
    private con:egret.Bitmap;
    //对
    private gameWorng:egret.Bitmap;
    //错
    private gameRight:egret.Bitmap;
    //游戏逻辑层UI
    private gameView:egret.Sprite;
    private uiLayer:egret.Sprite;
    private gameLayer:egret.Sprite;
    private topLayer:egret.Sprite;

    //游戏数据
    private showSorce:SpecialNumber;

    private returnClick:Boolean = false;

    private sorcebar:egret.Bitmap;
    private barNumPic:egret.Bitmap;
    private nvren:StarlingSwfMovieClip;
    private weixian:egret.Bitmap;
    private showsorce:egret.TextField;
    private soundView:SoundPopView;
    private curNumClick:number = 0;
    constructor(){
        super();

        this.initView();
    }

    private initView():void
    {
        var bg:egret.Bitmap = ResourceUtils.createBitmapByName("gamingbgImage");
        this.addChild(bg);

        this.gameLayer = new egret.Sprite();
        this.addChild(this.gameLayer);

        this.gameView = new egret.Sprite();
        this.addChild(this.gameView);
        this.gameView.y = Const.SCENT_HEIGHT/2 - 120;

        this.uiLayer = new egret.Sprite();
        this.addChild(this.uiLayer);

        this.topLayer = new egret.Sprite();
        this.addChild(this.topLayer);

        this.showSorce = new SpecialNumber("number_");
        this.sorcebar = ResourceUtils.createBitmapByName("sorcebarImage");
        this.barNumPic = ResourceUtils.createBitmapByName("barNum3Image");
        this.nvren = StarlingSwfFactory.getInstance().makeMc("nvren");
        this.weixian = ResourceUtils.createBitmapByName("weixianImage");

        this.showSorce.scaleX = this.showSorce.scaleY = 0.8;
        this.showsorce = new egret.TextField();
        this.showsorce.textColor = 0xffffff;
        this.showsorce.bold = true;
        this.showsorce.size = 16;
        this.showsorce.strokeColor = 0x000000;

        this.uiLayer.addChild(this.weixian);
        this.uiLayer.addChild(this.sorcebar);
        this.uiLayer.addChild(this.barNumPic);
        this.uiLayer.addChild(this.showsorce);
        this.uiLayer.addChild(this.nvren);
        this.nvren.gotoAndStop(0);

        var optionBtn:egret.Sprite = new egret.Sprite();
        var optionBmp:egret.Bitmap = ResourceUtils.createBitmapByName("optionbtnImage");
        optionBtn.addChild(optionBmp);
        optionBtn.touchEnabled = true;
        optionBtn.x = Const.SCENT_WIDTH-optionBtn.width;
        optionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showMusicView,this);
        this.uiLayer.addChild(optionBtn);

        this.uiLayer.addChild(this.showSorce);
        this.showSorce.y = 10;
        this.showSorce.setValue(GameData.sorce+"");
        this.showSorce.x = Const.SCENT_WIDTH/2-this.showSorce.width/2;

        this.weixian.visible = false;
        this.sorcebar.x = 65;
        this.sorcebar.y = 160;
        this.barNumPic.x = 30;
        this.barNumPic.y = 150;
        this.showsorce.x = 120;
        this.showsorce.y = 162;
        this.nvren.x = 360;
        this.nvren.y = 205;
        this.sorcebar.scaleX = GameData.winNum/GameData.threeWinNum;

        this.bar = ResourceUtils.createBitmapByName("gamingbarImage");
        this.uiLayer.addChild(this.bar);
        this.bar.y = Const.SCENT_HEIGHT-this.bar.height*2+10;
        this.bar.x = Const.SCENT_WIDTH/2-this.bar.width/2;

        this.barMask = ResourceUtils.createBitmapByName("gamingbarMaskImage");
        this.uiLayer.addChild(this.barMask);
        this.barMask.visible = false;

        this.barMask.y = Const.SCENT_HEIGHT-this.barMask.height*2+10;
        this.barMask.x = Const.SCENT_WIDTH/2-this.barMask.width/2;

        var gameMaskBar:egret.Bitmap = ResourceUtils.createBitmapByName("gameMaskBar");
        this.uiLayer.addChild(gameMaskBar);
        gameMaskBar.y = Const.SCENT_HEIGHT - gameMaskBar.height*1.5+3;
        gameMaskBar.x = Const.SCENT_WIDTH / 2 - gameMaskBar.width / 2;

        this.showTimer = new egret.TextField();
        this.showTimer.x = Const.SCENT_WIDTH/2;
        this.showTimer.y = Const.SCENT_HEIGHT - 35;
        this.showTimer.textColor = 0xffffff;
        this.showTimer.bold = true;
        this.showTimer.size = 16;
        this.showTimer.strokeColor = 0x000000;
        this.uiLayer.addChild(this.showTimer);

        this.numTwo = ResourceUtils.createBitmapByName("cutTwoImage");
        this.uiLayer.addChild(this.numTwo);
        this.numTwo.visible = false;

        this.gameRight= ResourceUtils.createBitmapByName("rightImage");
        this.topLayer.addChild(this.gameRight);

        this.gameWorng = ResourceUtils.createBitmapByName("worngImage");
        this.topLayer.addChild(this.gameWorng);

        this.gameRight.x= Const.SCENT_WIDTH/2-this.gameRight.width/2;
        this.gameRight.y = Const.SCENT_HEIGHT/2-this.gameRight.height/2;

        this.gameWorng.x= Const.SCENT_WIDTH/2-this.gameWorng.width/2;
        this.gameWorng.y = Const.SCENT_HEIGHT/2-this.gameWorng.height/2;

        this.gameRight.visible = false;
        this.gameWorng.visible = false;

        this.con = ResourceUtils.createBitmapByName("gameWinOverImage");
        this.topLayer.addChild(this.con);
        this.con.visible = false;

        var ready:egret.Bitmap = ResourceUtils.createBitmapByName("readyImage");
        this.topLayer.addChild(ready);

        this.go = ResourceUtils.createBitmapByName("goImage");
        this.topLayer.addChild(this.go);

        var norScaleX:number = Const.SCENT_WIDTH/2-ready.width/2;
        var norScaleY:number = Const.SCENT_HEIGHT/2-ready.height/2;

        this.nogScaleX = Const.SCENT_WIDTH/2-ready.width/2;
        this.nogScaleY = Const.SCENT_HEIGHT/2-ready.height/2;

        ready.scaleX = 0.1;
        ready.scaleY = 0.1;
        this.go.scaleX = 0.1;
        this.go.scaleY = 0.1;

        this.go.x = Const.SCENT_WIDTH/2;
        this.go.y = Const.SCENT_HEIGHT/2;
        ready.x = Const.SCENT_WIDTH/2;
        ready.y = Const.SCENT_HEIGHT/2;

        ready.visible = false;
        this.go.visible = false;

        ready.visible = true;

        this.soundView = new SoundPopView();
        this.addChild(this.soundView);
        this.soundView.visible = false;

        egret.Tween.get(ready).wait(400).to({"scaleX": 1, "scaleY":1,"x":norScaleX,"y":norScaleY},200).to({"visible": false},300).call(this.aaa,this);
    }
    private showMusicView(e:egret.TouchEvent):void
    {
        GameData.isClickBtn = true;
        this.soundView.visible = true;
        GameData.isPause = false;
        this.curNum = egret.getTimer();
    }
    private targetNum:number = 0;
    private onCLickHandler(e:egret.TouchEvent):void
    {
        if(this.returnClick) return;
        var str:string = e.currentTarget.name;
        var num:number = parseInt(<any>(str));
        SoundUtils.instance().playClick();
        if(num == 1)
        {
//            this.nvren.goToPlay("4");
            GameData.sorce+=100;
            this.showSorce.setValue(GameData.sorce+"");
            this.showSorce.x = Const.SCENT_WIDTH/2-this.showSorce.width/2;
            this.targetNum+=1;
            e.currentTarget.goToPlay("1");
            e.currentTarget.touchEnabled = false;
            if(this.targetNum == this.curNumClick)
            {
                this.curNumClick = 0;
                this.targetNum = 0;
                GameData.winNum+=1;
                GameData.sorce+=500;
                this.showSorce.setValue(GameData.sorce+"");
                this.showSorce.x = Const.SCENT_WIDTH/2-this.showSorce.width/2;
                if(GameData.winNum == GameData.threeWinNum)
                {
                    GameData.isPause = false;
                    this.barMask.visible = false;
                    this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrameHandler,this);
                    this.showsorce.text = GameData.winNum+"/"+GameData.threeWinNum;
                    SoundUtils.instance().stopBg();
                    SoundUtils.instance().stopTimer()
                    egret.Tween.get(this.bar).to({"scaleX":0},400).call(this.over,this);

                    return;
                }
                this.showRight();
                return;
            }
        }else if(num == 2){
            e.currentTarget.goToPlay("1");
            this.curNumClick = 0;
            this.targetNum = 0;
            this.showWorng();
            return;
        }
    }
    private aaa():void
    {
        this.go.visible = true;
        SoundUtils.instance().playReadyGo();
        egret.Tween.get(this.go).to({"scaleX": 1, "scaleY":1,"x":this.nogScaleX,"y":this.nogScaleY},200).to({"visible":false},300).call(this.bbb,this);
    }

    private bbb():void
    {
        egret.Tween.removeAllTweens();
        SoundUtils.instance().playBg();
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrameHandler,this);
        this.init1GameView();
    }
    private init1GameView():void
    {
        var _x:number = -Const.SCENT_WIDTH;
        egret.Tween.get(this.gameView).to({"x":_x},400).call(this.falseView,this);
    }
    private typeArr:Array<any> = [];
    private initClickTarget():void
    {

        var length:number = this.typeArr.length;
        for(var i:number = 0;i<length;i++)
        {
            this.typeArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCLickHandler,this);
        }
        this.gameView.removeChildren();
        this.typeArr = [];

        var spp:egret.Bitmap = ResourceUtils.createBitmapByName("sceneView3Image");
        this.gameView.addChild(spp);
        spp.x = spp.y = -65;

        var random:number = Math.round(1 + (3 - 1) * Math.random());
        var ran:number = 0;
        var i:number = 0;
        var num:number = 16;
        var mc:StarlingSwfMovieClip;

        for (; i < num; i++)
        {
            ran = Math.round(1 + (2 - 1) * Math.random());
            if(random == 1)
            {
                if(ran == 1)
                {
                    this.curNumClick++;
                    mc = StarlingSwfFactory.getInstance().makeMc("mc3Btn3Efc");
                }else{
                    mc = StarlingSwfFactory.getInstance().makeMc("mc3Btn1EfcW");
                }

                mc.name = ran+"";
                mc.gotoAndStop(0);
                mc.touchEnabled = true;
                this.gameView.addChild(mc);
                this.typeArr.push(mc);
            }else if(random == 2)
            {
                if(ran == 1)
                {
                    this.curNumClick++;
                    mc = StarlingSwfFactory.getInstance().makeMc("mc3Btn2Efc");
                }else{
                    mc = StarlingSwfFactory.getInstance().makeMc("mc3Btn2EfcW");
                }

                mc.name = ran+"";
                mc.gotoAndStop(0);
                mc.touchEnabled = true;
                this.gameView.addChild(mc);

                this.typeArr.push(mc);
            }else if(random == 3)
            {
                if(ran == 1)
                {
                    this.curNumClick++;
                    mc = StarlingSwfFactory.getInstance().makeMc("mc3Btn1Efc");
                }else{
                    mc = StarlingSwfFactory.getInstance().makeMc("mc3Btn3EfcW");
                }

                mc.name = ran+"";
                mc.gotoAndStop(0);
                this.gameView.addChild(mc);
                mc.touchEnabled = true;
                this.typeArr.push(mc);
            }
            mc.x=110*parseInt(<any>(i%4));
            mc.y=110*parseInt(<any>(i/4));
            this.typeArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCLickHandler,this);
        }
        this.gameView.visible = false;
        this.gameView.x = Const.SCENT_WIDTH/2 - this.gameView.width/2+75;
    }
    private initGameView():void
    {
        var _x:number = -Const.SCENT_WIDTH;
        egret.Tween.get(this.gameView).to({"x":_x},400).wait(400).call(this.falseView,this);
    }
    private falseView():void
    {
        this.initClickTarget();
        var _x:number = Const.SCENT_WIDTH/2 - this.gameView.width/2+75;
        this.gameView.x = Const.SCENT_WIDTH;
        this.gameView.visible = true;
        egret.Tween.get(this.gameView).to({"x":_x},400).call(this.initFrame,this);
    }
    private initFrame():void
    {
        egret.Tween.removeAllTweens();
        this.returnClick = false;
        this.targetNum = 0;
        GameData.isPause = true;
        GameData.isShow = false;
    }
    private passTime:number = 0;
    private num:number = 0;
    private curNum:number = 0;

    private onEnterFrameHandler(e:egret.Event)
    {
        if(GameData.isPause)
        {
            if(GameData.dataTimer == 2)
            {
                this.daoJiShiTotalTime = this.daoJiShiTotalTime-4000;
            }
            if(GameData.isStart)
            {
                this.daoJiShiTotalTime += egret.getTimer() - this.curNum;
                GameData.isStart = false;
                this.passTime =this.daoJiShiTotalTime - egret.getTimer();
            }else{
                this.passTime =this.daoJiShiTotalTime - egret.getTimer();
            }
            this.num = Math.floor((this.passTime/1000)/2);
            if(this.bar.scaleX >=0)
            {
                var n:number = ((Math.floor(this.passTime/1000*20)-(GameData.dataTimer*2*20))*1000)/(110*20*1000);
                this.bar.scaleX = n;
                this.barMask.scaleX = n;
            }

            this.showTimer.text=""+this.num;

            if(GameData.dataTimer == 2)
            {
                var _x:number = this.bar.width/55*this.num+this.bar.x;
                this.popNum(_x,this.bar.y);
            }
            GameData.dataTimer = 0;

            if(this.num <=10)
            {
                if(!this.isPlaySound){
                    this.isPlaySound = true;
                    SoundUtils.instance().playTimewarningSound();
                }
                if(!this.playBarMask)
                {
                    this.playBarMask = true;
                    this.weixian.visible = true;
                    egret.Tween.get(this.barMask).to({"visible":true},100).to({"visible":false},100).call(this.canPlay,this);
                }
                if(!this.canPlayNvren)
                {
                    this.canPlayNvren = true;
                    this.nvren.goToPlay("2")
                    this.nvren.setCompleteAction(this.complete,this);
                }
            }
            if(this.num<=0)
            {
                this.showTimer.text="0";

                GameData.winNum = 0;
                SoundUtils.instance().stopBg();
                SoundUtils.instance().stopTimer();
                this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrameHandler,this);
                this.typeArr = [];
//                GameData.sorce = 0;
                this.daoJiShiTotalTime = 0;
                if(this.parent) this.removeChildren();
                egret.Tween.removeAllTweens();
                GameSceneView.game.gameOver();
                return;
            }
            this.sorcebar.scaleX = GameData.winNum/GameData.threeWinNum;
            if(GameData.winNum >= 10)
            {
                this.showsorce.text = GameData.winNum+"/"+GameData.threeWinNum;
            }else{
                this.showsorce.text = "0"+GameData.winNum+"/"+GameData.threeWinNum;
            }
            this.gameStart();
        }
    }
    private canPlay():void
    {
        this.playBarMask = false;
        this.weixian.visible = false;
    }
    private playBarMask:Boolean;
    private isPlaySound:Boolean;
    private gameStart():void
    {
        if(!GameData.isShow)
        {
            GameData.isShow = true;
            this.showGame();
        }
    }
    private showGame():void
    {
        this.clearData();
    }

    private over():void
    {
        this.bar.visible = false;
        var _cX:number = 0;
        var _cY:number = 0;
        this.returnClick = true;
        this.con.scaleX = 2;
        this.con.scaleY = 2;
        this.con.x = -this.con.width/2;
        this.con.y = -this.con.height/2;

        this.con.visible = true;
        SoundUtils.instance().playEnd();
        egret.Tween.get(this.con).to({"scaleX":1,"scaleY":1,"x":_cX,"y":_cY},400).wait(2000).call(this.fun2,this);
    }
    private fun2():void
    {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrameHandler,this);
        GameData.curScene = 4;
        GameData.winNum = 0;

        this.typeArr = [];
        this.daoJiShiTotalTime = 0;
        if(this.parent) this.removeChildren();
        egret.Tween.removeAllTweens();
        GameSceneView.game.start();
    }
    private clearData():void
    {
        var i:number = 0;
        var num:number = 9;
        for(;i<num;i++)
        {
            this.typeArr[i].gotoAndStop(0);
        }

    }
    private showRight():void
    {
        this.nvren.goToPlay("3");
        GameData.isPause = false;
        this.curNum = egret.getTimer();
        this.returnClick = true;

        var norScaleX:number = Const.SCENT_WIDTH/2-this.gameRight.width/2;
        var norScaleY:number = Const.SCENT_HEIGHT/2-this.gameRight.height/2;


        this.gameRight.scaleX = 2;
        this.gameRight.scaleY = 2;
        this.gameRight.alpha = 0;

        this.gameRight.x = norScaleX - this.gameRight.width/2;
        this.gameRight.y = norScaleY - this.gameRight.height/2;

        this.gameRight.visible = true;
        SoundUtils.instance().playSemiclear();
        egret.Tween.get(this.gameRight).to({"alpha":1,"scaleX": 1, "scaleY":1,"x":norScaleX,"y":norScaleY},200).call(this.showFightView,this).to({"visible": false},800);
    }
    private canPlayNvren:Boolean = false;
    private complete():void
    {
        this.canPlayNvren = false;
    }
    private showWorng():void
    {
        this.nvren.goToPlay("1");
        GameData.isPause = false;
        GameData.dataTimer = 2;
        this.curNum = egret.getTimer();
        this.returnClick = true;
        var norScaleX:number = this.gameWorng.x;
        var norScaleY:number = this.gameWorng.y;

        this.gameWorng.scaleX = 2;
        this.gameWorng.scaleY = 2;
        this.gameWorng.alpha = 0.2;
        this.gameWorng.visible = true;

        this.gameWorng.x = norScaleX - this.gameWorng.width/2;
        this.gameWorng.y = norScaleY - this.gameWorng.height/2;

        SoundUtils.instance().playError();
        egret.Tween.get(this.gameWorng).to({"alpha":1,"scaleX": 1, "scaleY":1,"x":norScaleX,"y":norScaleY},200).call(this.showFightView,this).to({"visible": false},800);
    }

    private showFightView():void
    {
        this.initGameView();
        GameData.isStart = true;
        var i:number =0;
        var num:number = this.typeArr.length;
        for(;i<num;i++)
        {
            this.typeArr[i].touchEnabled = true;
        }
    }

    private popNum(_x:number,_y:number):void
    {
        this.numTwo.visible = true;
        this.numTwo.alpha = 0;
        this.numTwo.x = _x-this.numTwo.width/2;
        this.numTwo.y = _y;
        egret.Tween.get(this.numTwo).to({"alpha":1,"x":this.numTwo.x,"y":this.numTwo.y-100},300).to({"alpha": 0},300);
    }
}