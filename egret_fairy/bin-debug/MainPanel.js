var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainPanel = (function () {
    function MainPanel() {
        var _this = this;
        // text 1   fairy transition
        fairygui.UIPackage.addPackage("test");
        this.main = fairygui.UIPackage.createObject("test", "Main").asCom;
        this.main.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        var sword = this.main.getChild("n0").asCom;
        var txt = sword.getChild("n2").asTextField;
        var addTxt = sword.getChild("n6").asTextField;
        this.main.getChild("n1").asButton.addClickListener(function () {
            sword.getTransition("t0").play();
            txt.text = "" + (parseFloat(txt.text) + parseFloat(addTxt.text));
        }, this);
        // text 2   fairy controller
        fairygui.UIPackage.addPackage("test2");
        this.main2 = fairygui.UIPackage.createObject("test2", "Main").asCom;
        this.main2.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        var mian2Controller = this.main2.getController("c1");
        mian2Controller.selectedIndex = 1;
        // text 3  loop list (fairy button only loader)
        fairygui.UIPackage.addPackage("LoopList");
        this.main3 = fairygui.UIPackage.createObject("LoopList", "Main").asCom;
        this.main3.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.list = this.main3.getChild("n0").asList;
        this.list.setVirtualAndLoop();
        this.list.itemRenderer = function (index, obj) {
            var btn = obj.asButton;
            btn.setPivot(0.5, 0.5);
            btn.icon = fairygui.UIPackage.getItemURL("LoopList", "n" + (index + 1));
        };
        this.list.callbackThisObj = this;
        this.list.numItems = 5;
        this.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.doSpecialEffect, this);
        this.doSpecialEffect();
        // test 4   progress bar
        fairygui.UIPackage.addPackage("ProgressBar");
        this.main4 = fairygui.UIPackage.createObject("ProgressBar", "Main").asCom;
        this.main4.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        var progress = this.main4.getChild("n0").asProgress;
        progress.value = 0;
        var comboBox = this.main4.getChild("n1").asComboBox;
        comboBox.addEventListener(fairygui.StateChangeEvent.CHANGED, function () {
            progress.value = 0;
            var number = parseFloat(comboBox.value) * 1000 / progress.max;
            var timer = new egret.Timer(100, number);
            timer.addEventListener(egret.TimerEvent.TIMER, function () {
                progress.value += progress.max / number;
            }, _this);
            timer.start();
        }, this);
        // add fairy stage
        fairygui.GRoot.inst.addChild(this.main4);
    }
    MainPanel.prototype.doSpecialEffect = function () {
        //change the scale according to the distance to the middle
        var midX = this.list.scrollPane.posX + this.list.viewWidth / 2;
        var cnt = this.list.numChildren;
        for (var i = 0; i < cnt; i++) {
            var obj = this.list.getChildAt(i);
            var dist = Math.abs(midX - obj.x - obj.width / 2);
            if (dist > obj.width)
                obj.setScale(1, 1);
            else {
                var ss = 1 + (1 - dist / obj.width) * 0.2;
                obj.setScale(ss, ss);
            }
        }
    };
    return MainPanel;
}());
__reflect(MainPanel.prototype, "MainPanel");
