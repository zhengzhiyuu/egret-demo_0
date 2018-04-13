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
        ready.x = Const.SCENE_WIDTH / 2 - ready.width / 2;
        ready.y = 400;
    }
}