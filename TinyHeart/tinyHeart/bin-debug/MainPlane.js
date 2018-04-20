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
            // fairy
            var fruit = fairygui.UIPackage.createObject("TinyHeart", "fruit").asImage;
            var index = Math.floor(Math.random() * 50);
            fruit.setSize(16, 16);
            fruit.setPivot(0.5, 0.5);
            fruit.setScale(0, 0);
            fruit.x = index * 16 + Math.random() * 20;
            fruit.y = this.anyY[index];
            var self = this;
            var fruitTween = egret.Tween.get(fruit, {
                onChange: function () {
                    if (fruit.scaleX === 1) {
                        var fruitTween2_1 = egret.Tween.get(fruit, {
                            onChange: function () {
                                if (fruit.y < -16) {
                                    self._view.removeChild(fruit);
                                }
                            },
                            onChangeObj: fruit
                        }).to({ y: -16 }, Math.random() * 5000 + 2000);
                    }
                },
                onChangeObj: fruit
            }).to({ scaleX: 1, scaleY: 1 }, 1000);
            // this._view.addChild(fruit);
            // egret
            var fruit2 = Utils.createBitmapByName("fruit");
            fruit2.width = 16;
            fruit2.height = 16;
            fruit2.scaleX = 0;
            fruit2.scaleY = 0;
            fruit2.anchorOffsetX = fruit2.width / 2;
            fruit2.anchorOffsetY = fruit2.height / 2;
            fruit2.x = index * 16 + Math.random() * 20;
            fruit2.y = this.anyY[index];
            TinyHeart.GameScene.main.addChild(fruit2);
            var fruitTween2 = egret.Tween.get(fruit2, {
                onChange: function () {
                    if (fruit2.scaleX === 1) {
                        var fruitTween2_2 = egret.Tween.get(fruit2, {
                            onChange: function () {
                                if (fruit2.y < -16) {
                                    TinyHeart.GameScene.main.removeChild(fruit2);
                                }
                                console.log(self._fish.x);
                            },
                            onChangeObj: fruit2
                        }).to({ y: -16 }, Math.random() * 5000 + 2000);
                    }
                },
                onChangeObj: fruit2
            }).to({ scaleX: 1, scaleY: 1 }, 1000);
            var rec1 = new egret.Rectangle(fruit2.x, fruit2.y, fruit2.width, fruit2.height);
            var rec2 = new egret.Rectangle(this._fish.x, this._fish.x, this._fish.width, this._fish.height);
            var isHit = rec1.intersects(rec2);
            if (isHit) {
                console.log('is hit');
            }
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
