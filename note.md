# egret和fairyGui
* ## 推荐纹理图集分割软件 BigShear
* ## 新建egret工程文档，修改createGameScene函数

```ts
this.addChild(fairygui.GRoot.inst.displayObject);

this.mainPanel = new MainPanel();
```

* ## 新建MainPanel类文件，使用在fairy编辑器里的包和组件

```ts
class MainPanel {
    private _view: fairygui.GComponent;

    public constructor() {
        // 添加egret里.fui的别名  
        fairygui.UIPackage.addPackage("test");

        // createObject(包名, 组件名)
        this._view = fairygui.UIPackage.createObject("test", "clickBtn").asCom;
        this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        
        // 添加包下的boss组件
        let boss = fairygui.UIPackage.createObject("test", "boss").asCom;
        boss.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        
        // 获取clickBtn组件下的n1元素，类型为text
        let txt = this._view.getChild("n1").asTextField;

        // 获取clickBtn组件下的n0元素，类型为button，并添加点击事件
        let btn = this._view.getChild("n0").asButton;
        btn.addClickListener(function () {
            // 设置显示属性为false
            btn.visible = false; 
            txt.visible = false;
            // 向根添加组件 显示舞台中
            fairygui.GRoot.inst.addChild(boss);
            // 获取boss组件下的t0动画 并播放
            boss.getTransition("t0").play();
        }, this)

        fairygui.GRoot.inst.addChild(this._view);
    }
}

```
* ## 判断鼠标移动时方向（left，right）
建一个全局数组，鼠标移动时push鼠标的x值，当数组长度大于2，取最后的值和倒数第二个值比较，大于则向右，否则向左。
```ts
this.fishX.push(ev.stageX);
let len = this.fishX.length;
if (len > 100) { this.fishX.splice(0, 50); }
timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
    if (len > 2) {
        let oldX = this.fishX[len - 2];
        let newX = this.fishX[len - 1];
        if (newX < oldX) {
            this._fish.skewX = 0;
            this._fish.skewY = 0;
        } else {
            this._fish.skewX = 180;
            this._fish.skewY = 180;
        }
    }
}, this)
timer.start();
console.log(this.fishX)
```