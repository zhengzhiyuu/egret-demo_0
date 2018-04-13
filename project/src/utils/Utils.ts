class Utils extends egret.Sprite {
    public constructor() {
        super();
    }

    public clearPrevBitmap(): void {
        while (this.numChildren) {
            this.removeChildAt(0);
        }
    }

    public static createBitMapByName(name: string) {
        let result: egret.Bitmap = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static touchBegin(obj: egret.Bitmap, func: Function): void {
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, func, this);
    }
}