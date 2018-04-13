class GameSceneView extends egret.Sprite {
    public static _game: GameSceneView;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }

    private initView(): void {
        this.showHome();
    }

    public showHome(): void {
        new Utils().clearPrevBitmap();
        let startView = new GameStartView();
        this.addChild(startView);
    }
}