class Utils {

    public static createBitMapByName(name: string) {
        let result: egret.Bitmap = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static touchBegin(obj:egret.Bitmap, func:Function) {
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, func, this);
    }
}