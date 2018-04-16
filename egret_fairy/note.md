# egret和fairyGui
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
        // 添加包test   
        fairygui.UIPackage.addPackage("test");

        // 添加包下的clickBtn组件
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