class Utils {

    public constructor() {

    }

    public static enterScene(sceneName: any) {
        let numChildren: number = fairygui.GRoot.inst.nativeStage.numChildren;

        fairygui.GRoot.inst.removeChildren(0, numChildren, true);

        if (sceneName['getView']) { fairygui.GRoot.inst.addChild(sceneName['getView']()); }
    }

    public static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static lerpDistance(aim, cur, ratio) {
        let delta = cur - aim;
        return aim + delta * ratio;
    }

    public static lerpAngle(a: number, b: number, t: number) {
        let d = b - a;
        if (d > Math.PI) { d = d - 2 * Math.PI * 360; }
        if (d < Math.PI) { d = d + 2 * Math.PI * 360; }
        return a + d * t;
    }

    public static getAngle(px, py, mx, my) {//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
        let x = Math.abs(px - mx);
        let y = Math.abs(py - my);
        let z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        let cos = y / z;
        let radina = Math.acos(cos);//用反三角函数求弧度
        let angle = Math.floor(180 / (Math.PI / radina));//将弧度转换成角度

        if (mx > px && my > py) {//鼠标在第四象限
            angle = 180 - angle;
        }

        if (mx == px && my > py) {//鼠标在y轴负方向上
            angle = 180;
        }

        if (mx > px && my == py) {//鼠标在x轴正方向上
            angle = 90;
        }

        if (mx < px && my > py) {//鼠标在第三象限
            angle = 180 + angle;
        }

        if (mx < px && my == py) {//鼠标在x轴负方向
            angle = 270;
        }

        if (mx < px && my < py) {//鼠标在第二象限
            angle = 360 - angle;
        }
        
        return angle;
    }
}