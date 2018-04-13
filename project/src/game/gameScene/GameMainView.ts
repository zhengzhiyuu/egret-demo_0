class GameMainView extends egret.Sprite {
    public gameHint: egret.Bitmap;
    private number: number = 0;
    private sceneNum: any;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initMain, this);
    }

    public initMain() {
        this.showHint(this.number);
    }

    public showHint(index: number = 0) {
        switch (index) {
            case 0:
                this.gameHint = Utils.createBitMapByName('gameinfo_1_jpg');
                break;
            case 1:
                this.gameHint = Utils.createBitMapByName('gameinfo_2_jpg');
                break;
            case 2:
                this.gameHint = Utils.createBitMapByName('gameinfo_3_jpg');
                break;
            case 3:
                this.gameHint = Utils.createBitMapByName('gameinfo_4_jpg');
                break;
        }

        this.addChild(this.gameHint);
        this.gameHint.width = Const.SCENE_WIDTH;
        this.gameHint.height = Const.SCENE_HEIGHT;
        this.addChild(this.gameHint);
        this.gameHint.touchEnabled = true;
        Utils.touchBegin(this.gameHint, this.changeScene.bind(this));

        let hintTop = Utils.createBitMapByName('hint_top_png')
        this.addChild(hintTop);
        hintTop.width = hintTop.width * 1.5;
        hintTop.height = hintTop.height * 1.5;
        hintTop.x = Const.SCENE_WIDTH / 2 - hintTop.width / 2;
        hintTop.y = 20

        let nextBtn = Utils.createBitMapByName('startGame_btn_png');
        this.addChild(nextBtn);
        nextBtn.x = Const.SCENE_WIDTH / 2 - nextBtn.width / 2;
        nextBtn.y = Const.SCENE_HEIGHT - nextBtn.height - 20;
    }

    private changeScene() {
        switch (this.number) {
            case 0:
                this.removeChildren();
                this.gameHint.touchEnabled = false;
                this.sceneNum = new GameSceneOne();
                this.addChild(this.sceneNum);
                break;
        }
    }
}