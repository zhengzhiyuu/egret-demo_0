var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by Administrator on 2014/9/17.
 */
var GameData = (function () {
    function GameData() {
    }
    GameData.curScene = 0;
    GameData.dataTimer = 0;
    GameData.winNum = 0;
    GameData.sorce = 0;
    GameData.threeWinNum = 20;
    GameData.fourWinNum = 30;
    GameData.overIsWin = true;
    GameData.n = ["1", "0", ".", "0", ".", "4", ".", "1", "8", "2", ":", "3", "0", "0", "0"];
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
