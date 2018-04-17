class MainPanel {
    private main: fairygui.GComponent;
    private main2: fairygui.GComponent;
    private main3: fairygui.GComponent;
    private main4: fairygui.GComponent;
    private list: fairygui.GList;

    public constructor() {

        // text 1   fairy transition
        fairygui.UIPackage.addPackage("test");

        this.main = fairygui.UIPackage.createObject("test", "Main").asCom;
        this.main.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);

        let sword: fairygui.GComponent = this.main.getChild("n0").asCom;

        let txt: fairygui.GTextField = sword.getChild("n2").asTextField;
        let addTxt: fairygui.GTextField = sword.getChild("n6").asTextField;

        this.main.getChild("n1").asButton.addClickListener((): void => {
            sword.getTransition("t0").play();
            txt.text = `${parseFloat(txt.text) + parseFloat(addTxt.text)}`;
        }, this)

        // text 2   fairy controller
        fairygui.UIPackage.addPackage("test2");

        this.main2 = fairygui.UIPackage.createObject("test2", "Main").asCom;
        this.main2.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        let mian2Controller: fairygui.Controller = this.main2.getController("c1");
        mian2Controller.selectedIndex = 1;

        // text 3  loop list (fairy button only loader)
        fairygui.UIPackage.addPackage("LoopList");

        this.main3 = fairygui.UIPackage.createObject("LoopList", "Main").asCom;
        this.main3.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);

        this.list = this.main3.getChild("n0").asList;
        this.list.setVirtualAndLoop();
        this.list.itemRenderer = (index: number, obj: fairygui.GObject): void => {
            let btn: fairygui.GButton = obj.asButton;
            btn.setPivot(0.5, 0.5);
            btn.icon = fairygui.UIPackage.getItemURL("LoopList", `n${index + 1}`);
        }
        this.list.callbackThisObj = this;
        this.list.numItems = 5;
        this.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.doSpecialEffect, this);
        this.doSpecialEffect();

        // test 4   progress bar
        fairygui.UIPackage.addPackage("ProgressBar");
        this.main4 = fairygui.UIPackage.createObject("ProgressBar", "Main").asCom;
        this.main4.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);

        let progress = this.main4.getChild("n0").asProgress;
        progress.value = 0;

        let comboBox: fairygui.GComboBox = this.main4.getChild("n1").asComboBox;
        comboBox.addEventListener(fairygui.StateChangeEvent.CHANGED, (): void => {
            progress.value = 0;
            let number: number = parseFloat(comboBox.value) * 1000 / progress.max;
            let timer: egret.Timer = new egret.Timer(100, number);
            timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
                progress.value += progress.max / number;
            }, this)
            timer.start();
        }, this)



        // add fairy stage
        fairygui.GRoot.inst.addChild(this.main4);
    }

    private doSpecialEffect(): void {
        //change the scale according to the distance to the middle
        let midX: number = this.list.scrollPane.posX + this.list.viewWidth / 2;
        let cnt: number = this.list.numChildren;
        for (let i: number = 0; i < cnt; i++) {
            let obj: fairygui.GObject = this.list.getChildAt(i);
            let dist: number = Math.abs(midX - obj.x - obj.width / 2);
            if (dist > obj.width) //no intersection
                obj.setScale(1, 1);
            else {
                let ss: number = 1 + (1 - dist / obj.width) * 0.2;
                obj.setScale(ss, ss);
            }
        }
    }
}