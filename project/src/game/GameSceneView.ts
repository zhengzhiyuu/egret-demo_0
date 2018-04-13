class GameSceneView extends egret.Sprite {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }

    private initView(): void {
        this.showHome();
    }

    private clear(): void {
        while (this.numChildren) {
            this.removeChildAt(0);
        }
    }

    public showHome(): void {
        this.clear();
        let startView = new GameStartView();
        this.addChild(startView);
    }
}