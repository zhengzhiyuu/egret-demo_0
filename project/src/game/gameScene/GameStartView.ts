class GameStartView extends egret.Sprite {
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }

    private initView(): void {
        let bg = Utils.createBitMapByName('load_bg_jpg');
        this.addChild(bg);
        bg.width = Const.SCENE_WIDTH;
        bg.height = Const.SCENE_HEIGHT;

        let startBtn = Utils.createBitMapByName('start_btn_png');
        this.addChild(startBtn);
        let startBtnX: number = Const.SCENE_WIDTH / 2 - startBtn.width / 2;
        let startBtnY: number = Const.SCENE_HEIGHT - startBtn.height - 140;
        startBtn.x = startBtnX;
        startBtn.y = startBtnY;
        startBtn.touchEnabled = true;
        Utils.touchBegin(startBtn, this.showGameHint);

        let getMore = Utils.createBitMapByName('getmore_png');
        this.addChild(getMore);
        let getMoreBtnX: number = Const.SCENE_WIDTH / 2 - getMore.width / 2;
        let getMoreBtnY: number = Const.SCENE_HEIGHT - getMore.height - 20;
        getMore.x = getMoreBtnX;
        getMore.y = getMoreBtnY;
    }

    private showGameHint(): void {
        egret.log('game log');
    }
}