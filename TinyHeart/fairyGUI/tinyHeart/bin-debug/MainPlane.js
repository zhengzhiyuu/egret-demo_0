var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var TinyHeart;
(function (TinyHeart) {
    var PlayGame = (function () {
        function PlayGame() {
            fairygui.UIPackage.addPackage("TinyHeart");
            this._view = fairygui.UIPackage.createObject("TinyHeart", "Play").asCom;
            this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            this._view.enabled = true;
            this._view.addClickListener(function () {
                var gameScene = new TinyHeart.GameScene();
                Utils.enterScene(gameScene);
            }, this);
        }
        PlayGame.prototype.getView = function () {
            return this._view;
        };
        return PlayGame;
    }());
    TinyHeart.PlayGame = PlayGame;
    __reflect(PlayGame.prototype, "TinyHeart.PlayGame");
    var GameScene = (function () {
        function GameScene() {
            this._anys = [];
            this.anyY = [];
            fairygui.UIPackage.addPackage("TinyHeart");
            this._view = fairygui.UIPackage.createObject("TinyHeart", "Main").asCom;
            this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            // let shape: TinyHeart.Ane = new TinyHeart.Ane();
            // TinyHeart.GameScene.main.addChild(shape);
            this.initFish();
            this.initAny();
            this.initFruit();
            var timer = new egret.Timer(300, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.initFruit, this);
            timer.start();
            this.gameTxt = this._view.getChild('txt').asTextField;
        }
        GameScene.prototype.getView = function () {
            return this._view;
        };
        GameScene.prototype.initAny = function () {
            var anyNumber = 50;
            for (var i = 0; i < anyNumber; i++) {
                var any = new fairygui.GGraph();
                any.setSize(16, 200);
                any.drawRect(0, 0xfff, 0, 0x3b154e, 0.6, [16, 16, 16, 16]);
                any.height = 150 + Math.random() * 50;
                any.x = i * 16 + Math.random() * 20;
                any.y = fairygui.GRoot.inst.height - any.height + 50;
                this._anys.push(any);
                this.anyY.push(any.y);
            }
            for (var i = 0; i < anyNumber; i++) {
                this._view.addChild(this._anys[i]);
            }
        };
        GameScene.prototype.initFruit = function () {
            var _this = this;
            var index = Math.floor(Math.random() * 50);
            var self = this;
            var fruit = Utils.createBitmapByName("fruit");
            fruit.width = 16;
            fruit.height = 16;
            fruit.scaleX = 0;
            fruit.scaleY = 0;
            fruit.anchorOffsetX = fruit.width / 2;
            fruit.anchorOffsetY = fruit.height / 2;
            fruit.x = index * 16 + Math.random() * 20;
            fruit.y = this.anyY[index];
            TinyHeart.GameScene.main.addChild(fruit);
            var fruitTween = egret.Tween.get(fruit, {
                onChange: function () {
                    if (fruit.scaleX === 1) {
                        var fruitTween2 = egret.Tween.get(fruit, {
                            onChange: function () {
                                if (fruit.y <= 0) {
                                    TinyHeart.GameScene.main.removeChild(fruit);
                                }
                            },
                            onChangeObj: fruit
                        }).to({ y: 0 }, Math.random() * 5000 + 2000);
                    }
                },
                onChangeObj: fruit
            }).to({ scaleX: 1, scaleY: 1 }, 1000);
            var timer = new egret.Timer(10, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, function () {
                var rec1 = new egret.Rectangle(fruit.x, fruit.y, fruit.width, fruit.height);
                var rec2 = new egret.Rectangle(self._fish.x, self._fish.y, self._fish.width, self._fish.height);
                var hit = rec1.intersects(rec2);
                if (fruit.y <= 5) {
                    timer.stop();
                }
                var number = parseFloat(_this.gameTxt.text);
                if (hit) {
                    fruit.visible = false;
                    timer.stop();
                    _this.gameTxt.text = "" + (number += 10);
                }
            }, this);
            timer.start();
        };
        GameScene.prototype.initFish = function () {
            this._fish = this._view.getChild("fish").asButton;
            // this._fish.sortingOrder = 5;
            this._fish.draggable = true;
            this._fish.dragBounds = new egret.Rectangle(0, 0, fairygui.GRoot.inst.width - 15, fairygui.GRoot.inst.height);
            var fishStartX = 0;
            var fishMovex = 0;
            this._fish.addEventListener(fairygui.DragEvent.DRAG_START, function (ev) {
                fishStartX = ev.stageX;
            }, this);
            this._fish.addEventListener(fairygui.DragEvent.DRAG_MOVING, function (ev) {
                fishMovex = ev.stageX;
                // if (fishStartX > fishMovex) {
                //     console.log('left')
                // } else {
                //     console.log('right')
                // }
            }, this);
            this._fish.addEventListener(fairygui.DragEvent.DRAG_END, function () {
                console.log('end');
            }, this);
        };
        GameScene.prototype.fruitMonitor = function () {
        };
        return GameScene;
    }());
    TinyHeart.GameScene = GameScene;
    __reflect(GameScene.prototype, "TinyHeart.GameScene");
    var Ane = (function (_super) {
        __extends(Ane, _super);
        function Ane() {
            var _this = _super.call(this) || this;
            _this.drawAny();
            return _this;
        }
        Ane.prototype.drawAny = function () {
            this.graphics.beginFill(0x84157b);
            this.graphics.drawRect(0, 0, 50, 50);
            this.graphics.endFill();
        };
        return Ane;
    }(egret.Shape));
    TinyHeart.Ane = Ane;
    __reflect(Ane.prototype, "TinyHeart.Ane");
})(TinyHeart || (TinyHeart = {}));
