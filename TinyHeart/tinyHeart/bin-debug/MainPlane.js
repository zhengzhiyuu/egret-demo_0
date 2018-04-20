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
            this._fruits = [];
            this.anyY = [];
            fairygui.UIPackage.addPackage("TinyHeart");
            this._view = fairygui.UIPackage.createObject("TinyHeart", "Main").asCom;
            this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            // let shape: TinyHeart.Ane = new TinyHeart.Ane();
            // TinyHeart.GameScene.main.addChild(shape);
            this.initAny();
            this.initFruit();
            var timer = new egret.Timer(500, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.fruitMonitor, this);
            timer.start();
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
                if (fishStartX > fishMovex) {
                    console.log('left');
                }
                else {
                    console.log('right');
                }
            }, this);
            this._fish.addEventListener(fairygui.DragEvent.DRAG_END, function () {
                console.log('end');
            }, this);
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
            var fruinNumber = 50;
            for (var i = 0; i < fruinNumber; i++) {
                var fruit = fairygui.UIPackage.createObject("TinyHeart", "fruit").asImage;
                fruit.setSize(16, 16);
                fruit.setPivot(0.5, 0.5);
                fruit.setScale(0, 0);
                fruit.x = i * 16 + Math.random() * 20;
                fruit.y = this.anyY[i];
                this._fruits.push(fruit);
            }
        };
        GameScene.prototype.fruitMonitor = function () {
            var self = this;
            var _loop_1 = function (i) {
                var fruit = this_1._fruits.splice(Math.floor(Math.random() * this_1._fruits.length - 1), 1)[0];
                var fruitTween = egret.Tween.get(fruit, {
                    onChange: function () {
                        if (fruit.scaleX === 1) {
                            var fruitTween2 = egret.Tween.get(fruit, {
                                onChange: function () {
                                    if (fruit.y < 16 && self._fruits.length === 0) {
                                        console.log(1);
                                        return;
                                    }
                                },
                                onChangeObj: fruit
                            }).to({ y: -16 }, Math.random() * 5000 + 2000);
                        }
                    },
                    onChangeObj: fruit
                }).to({ scaleX: 1, scaleY: 1 }, 1000);
                this_1._view.addChild(fruit);
                console.log(this_1._fruits[1].y);
            };
            var this_1 = this;
            for (var i = 0; i < this._fruits.length; i++) {
                _loop_1(i);
            }
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
