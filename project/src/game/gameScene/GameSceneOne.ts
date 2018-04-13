class GameSceneOne extends egret.Sprite {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init(): void {
        let bg: egret.Bitmap = Utils.createBitMapByName('gaming_bg_jpg');
        this.addChild(bg);
        bg.width = Const.SCENE_WIDTH;
        bg.height = Const.SCENE_HEIGHT;

        let ready: egret.Bitmap = Utils.createBitMapByName('ready_png');
        this.addChild(ready);
        ready.scaleX = 0.8;
        ready.scaleY = 0.8;
        ready.anchorOffsetX = ready.width / 2;
        ready.anchorOffsetY = ready.height / 2;
        ready.x = Const.SCENE_WIDTH / 2
        ready.y = 450;

        let go: egret.Bitmap = Utils.createBitMapByName('go_png');
        go.scaleX = 0.8;
        go.scaleY = 0.8;
        go.anchorOffsetX = go.width / 2;
        go.anchorOffsetY = go.height / 2;
        go.x = Const.SCENE_WIDTH / 2
        go.y = 450;

        let self = this;
        let tw = egret.Tween.get(ready, {
            onChange: function () {
                if (ready.scaleX === 1) {
                    self.removeChild(ready);
                    self.addChild(go);
                    let tw = egret.Tween.get(go, {
                        onChange: function () {
                            if (go.scaleX === 1) {
                                self.removeChild(go)
                            }
                        },
                        onChangeObj: go
                    })
                    tw.to({
                        scaleX: 1,
                        scaleY: 1
                    }, 600)
                }
            },
            onChangeObj: ready
        })
        tw.to({
            scaleX: 1,
            scaleY: 1
        }, 500)
    }
}