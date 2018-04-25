var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            this.fishX = [];
            // private _anys: Array<fairygui.GGraph> = [];
            this._anys = [];
            this.anyXY = [];
            fairygui.UIPackage.addPackage("TinyHeart");
            this._view = fairygui.UIPackage.createObject("TinyHeart", "Main").asCom;
            this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
            // let shape: TinyHeart.Ane = new TinyHeart.Ane();
            // TinyHeart.GameScene.main.addChild(shape);
            // let leftBtn = this.initBtn(GameScene.main.width - 100, GameScene.main.height - 80, "left");
            // let rightBtn = this.initBtn(GameScene.main.width - 50, GameScene.main.height - 80, "right");
            // this.initFish();
            this.initAny();
            this.initFruit();
            var timer = new egret.Timer(300, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.initFruit, this);
            timer.start();
            this.gameTxt = this._view.getChild('txt').asTextField;
            // GameScene.main.addChild(new Joystick());
            this.fishCalss = new Fish();
            GameScene.main.addChild(this.fishCalss);
        }
        GameScene.prototype.getView = function () {
            return this._view;
        };
        GameScene.prototype.initBtn = function (x, y, direction) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (direction === void 0) { direction = "up"; }
            var point = Utils.createBitmapByName("point");
            point.width = 40;
            point.height = 50;
            point.x = x;
            point.y = y;
            point.anchorOffsetX = point.width / 2;
            point.anchorOffsetY = point.height / 2;
            var self = this;
            point.touchEnabled = true;
            switch (direction) {
                case "left":
                    point.rotation = -90;
                    point.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                        console.log("left");
                    }, this);
                    break;
                case "right":
                    point.rotation = 90;
                    point.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                        console.log("right");
                    }, this);
                    break;
                case "up":
                    point.rotation = 0;
                    point.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                        console.log("up");
                    }, this);
                    break;
                case "down":
                    point.rotation = 180;
                    point.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                        console.log("down");
                    }, this);
                    break;
            }
            GameScene.main.addChild(point);
        };
        GameScene.prototype.initAny = function () {
            var _this = this;
            var anyNumber = 50;
            var _loop_1 = function (i) {
                // let any: fairygui.GGraph = new fairygui.GGraph();
                // any.setSize(16, 200);
                // any.drawRect(0, 0xfff, 0, 0x3b154e, 0.6, [16, 16, 16, 16]);
                // any.height = 150 + Math.random() * 50;
                // any.x = i * 16 + Math.random() * 20;
                // any.y = fairygui.GRoot.inst.height - any.height + 50;
                // this._anys.push(any);
                // this.anyY.push(any.y);
                /**
                 *  二次贝赛尔曲线
                 */
                var any = new egret.Shape();
                var moveNumber = 70;
                var index = 0;
                var moveX = i * 16 + Math.random() * 20, moveY = GameScene.main.height;
                var p1X = moveX, p1Y = moveY - 100;
                var p2X = moveX - moveNumber, p2Y = moveY - (120 + Math.random() * 50);
                var timer = new egret.Timer(20 + Math.random() * 2 + 1, 0);
                any.graphics.clear();
                any.graphics.lineStyle(16, 0x3b154e);
                any.graphics.moveTo(moveX, moveY);
                any.graphics.curveTo(p1X, p1Y, p2X, p2Y);
                any.alpha = 0.6;
                any.graphics.endFill();
                timer.addEventListener(egret.TimerEvent.TIMER, function () {
                    if (index === 0) {
                        if (p2X < moveX + moveNumber) {
                            p2X += 1;
                        }
                        else {
                            index = 1;
                        }
                    }
                    else if (index === 1) {
                        if (p2X > moveX - moveNumber) {
                            p2X -= 1;
                        }
                        else {
                            index = 0;
                        }
                    }
                    any.graphics.clear();
                    any.graphics.lineStyle(16, 0x3b154e);
                    any.graphics.moveTo(moveX, moveY);
                    any.graphics.curveTo(p1X, p1Y, p2X, p2Y);
                    any.alpha = 0.6;
                    any.graphics.endFill();
                    _this.anyXY[i] = [p2X, p2Y, index];
                }, this_1);
                timer.start();
                this_1._anys.push(any);
            };
            var this_1 = this;
            for (var i = 0; i < anyNumber; i++) {
                _loop_1(i);
            }
            for (var i = 0; i < anyNumber; i++) {
                // this._view.addChild(this._anys[i]);
                GameScene.main.addChild(this._anys[i]);
            }
        };
        GameScene.prototype.initFruit = function () {
            var _this = this;
            if (this.anyXY.length !== 0) {
                var index_1 = Math.floor(Math.random() * 50);
                var self_1 = this;
                var fruit_1 = Utils.createBitmapByName("fruit");
                fruit_1.width = 16;
                fruit_1.height = 16;
                fruit_1.scaleX = 0;
                fruit_1.scaleY = 0;
                fruit_1.anchorOffsetX = fruit_1.width / 2;
                fruit_1.anchorOffsetY = fruit_1.height / 2;
                fruit_1.x = this.anyXY[index_1][0];
                fruit_1.y = this.anyXY[index_1][1];
                TinyHeart.GameScene.main.addChild(fruit_1);
                var fruitTween = egret.Tween.get(fruit_1, {
                    onChange: function () {
                        if (fruit_1.scaleX === 1) {
                            var fruitTween2 = egret.Tween.get(fruit_1, {
                                onChange: function () {
                                    if (fruit_1.y <= 0) {
                                        TinyHeart.GameScene.main.removeChild(fruit_1);
                                    }
                                },
                                onChangeObj: fruit_1
                            }).to({ y: 0 }, Math.random() * 5000 + 2000);
                        }
                        else {
                            var index2 = self_1.anyXY[index_1][2];
                            if (index2 === 0) {
                                fruit_1.x += 0.5;
                            }
                            else if (index2 === 1) {
                                fruit_1.x -= 0.5;
                            }
                        }
                    },
                    onChangeObj: fruit_1
                }).to({ scaleX: 1, scaleY: 1 }, 1000);
                var count_1 = 0;
                var enemyTime_1 = 3;
                var timer_1 = new egret.Timer(10, 0);
                timer_1.addEventListener(egret.TimerEvent.TIMER, function () {
                    count_1 += 1;
                    // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat0`);
                    if (count_1 >= enemyTime_1 * 100) {
                        _this.initBlue();
                        count_1 = 0;
                    }
                    var recFruit = new egret.Rectangle(fruit_1.x, fruit_1.y, fruit_1.width, fruit_1.height);
                    // let recFish = new egret.Rectangle(self._fish.x, self._fish.y, self._fish.width, self._fish.height);
                    var recFish = new egret.Rectangle(self_1.fishCalss.x, self_1.fishCalss.y, self_1.fishCalss.width, self_1.fishCalss.height);
                    var hit = recFruit.intersects(recFish);
                    if (fruit_1.y <= 5) {
                        timer_1.stop();
                    }
                    var number = parseFloat(_this.gameTxt.text);
                    if (hit) {
                        fruit_1.visible = false;
                        // GameScene.main.removeChild(fruit);
                        // this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye1`);
                        _this.fishCalss.setEye("bigEye1");
                        if (number < 50) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat0`);
                            _this.fishCalss.setHead("bigEat0");
                        }
                        else if (number < 100) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat1`);
                            _this.fishCalss.setHead("bigEat1");
                        }
                        else if (number < 500) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat2`);
                            _this.fishCalss.setHead("bigEat2");
                        }
                        else if (number < 1000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat3`);
                            _this.fishCalss.setHead("bigEat3");
                        }
                        else if (number < 2000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat4`);
                            _this.fishCalss.setHead("bigEat4");
                        }
                        else if (number < 5000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat5`);
                            _this.fishCalss.setHead("bigEat5");
                        }
                        else if (number < 8000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat6`);
                            _this.fishCalss.setHead("bigEat6");
                        }
                        else if (number < 10000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat7`);
                            _this.fishCalss.setHead("bigEat7");
                        }
                        else {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat7`);
                            _this.fishCalss.setHead("bigEat7");
                        }
                        var timer2 = new egret.Timer(100, 1);
                        timer2.addEventListener(egret.TimerEvent.TIMER, function () {
                            // this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye0`);
                            self_1.fishCalss.setEye("bigEye0");
                            if (number < 50) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim0`);
                                _this.fishCalss.setHead("bigSwim0");
                            }
                            else if (number < 100) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim1`);
                                _this.fishCalss.setHead("bigSwim1");
                            }
                            else if (number < 500) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim2`);
                                _this.fishCalss.setHead("bigSwim2");
                            }
                            else if (number < 1000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim3`);
                                _this.fishCalss.setHead("bigSwim3");
                            }
                            else if (number < 2000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim4`);
                                _this.fishCalss.setHead("bigSwim4");
                            }
                            else if (number < 5000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim5`);
                                _this.fishCalss.setHead("bigSwim5");
                            }
                            else if (number < 8000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim6`);
                                _this.fishCalss.setHead("bigSwim6");
                            }
                            else if (number < 10000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim7`);
                                _this.fishCalss.setHead("bigSwim7");
                            }
                            else {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim7`);
                                _this.fishCalss.setHead("bigSwim7");
                            }
                        }, _this);
                        timer_1.stop();
                        timer2.start();
                        _this.gameTxt.text = "" + (number += 10);
                    }
                }, this);
                timer_1.start();
            }
        };
        GameScene.prototype.initBlue = function () {
            var _this = this;
            if (this.anyXY.length !== 0) {
                var index_2 = Math.floor(Math.random() * 50);
                var self_2 = this;
                var blue_1 = Utils.createBitmapByName("blue");
                blue_1.width = 16;
                blue_1.height = 16;
                blue_1.scaleX = 0;
                blue_1.scaleY = 0;
                blue_1.anchorOffsetX = blue_1.width / 2;
                blue_1.anchorOffsetY = blue_1.height / 2;
                if (this.anyXY.length !== 0) {
                    blue_1.x = this.anyXY[index_2][0];
                    blue_1.y = this.anyXY[index_2][1];
                }
                TinyHeart.GameScene.main.addChild(blue_1);
                var blueTween = egret.Tween.get(blue_1, {
                    onChange: function () {
                        if (blue_1.scaleX === 1) {
                            var blueTween2 = egret.Tween.get(blue_1, {
                                onChange: function () {
                                    if (blue_1.y <= 0) {
                                        TinyHeart.GameScene.main.removeChild(blue_1);
                                    }
                                },
                                onChangeObj: blue_1
                            }).to({ y: 0 }, Math.random() * 5000 + 2000);
                        }
                        else {
                            var index2 = self_2.anyXY[index_2][2];
                            if (index2 === 0) {
                                blue_1.x += 0.5;
                            }
                            else if (index2 === 1) {
                                blue_1.x -= 0.5;
                            }
                        }
                    },
                    onChangeObj: blue_1
                }).to({ scaleX: 1, scaleY: 1 }, 1000);
                var timer_2 = new egret.Timer(10, 0);
                timer_2.addEventListener(egret.TimerEvent.TIMER, function () {
                    var recBlue = new egret.Rectangle(blue_1.x, blue_1.y, blue_1.width, blue_1.height);
                    // let recFish = new egret.Rectangle(self._fish.x, self._fish.y, self._fish.width, self._fish.height);
                    var recFish = new egret.Rectangle(self_2.fishCalss.x, self_2.fishCalss.y, self_2.fishCalss.width, self_2.fishCalss.height);
                    var hit = recBlue.intersects(recFish);
                    if (blue_1.y <= 5) {
                        timer_2.stop();
                    }
                    var number = parseFloat(_this.gameTxt.text);
                    if (hit) {
                        blue_1.visible = false;
                        // this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye1`);
                        _this.fishCalss.setEye("bigEye1");
                        if (number < 50) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue0`);
                            _this.fishCalss.setHead("bigEatBlue0");
                        }
                        else if (number < 100) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue1`);
                            _this.fishCalss.setHead("bigEatBlue1");
                        }
                        else if (number < 500) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue2`);
                            _this.fishCalss.setHead("bigEatBlue2");
                        }
                        else if (number < 1000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue3`);
                            _this.fishCalss.setHead("bigEatBlue3");
                        }
                        else if (number < 2000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue4`);
                            _this.fishCalss.setHead("bigEatBlue4");
                        }
                        else if (number < 5000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue5`);
                            _this.fishCalss.setHead("bigEatBlue5");
                        }
                        else if (number < 8000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue6`);
                            _this.fishCalss.setHead("bigEatBlue6");
                        }
                        else if (number < 10000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue7`);
                            _this.fishCalss.setHead("bigEatBlue7");
                        }
                        else {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue7`);
                            _this.fishCalss.setHead("bigEatBlue7");
                        }
                        var timer2 = new egret.Timer(100, 1);
                        timer2.addEventListener(egret.TimerEvent.TIMER, function () {
                            // this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye0`);
                            _this.fishCalss.setEye("bigEye0");
                            if (number < 50) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue0`);
                                _this.fishCalss.setHead("bigSwimBlue0");
                            }
                            else if (number < 100) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue1`);
                                _this.fishCalss.setHead("bigSwimBlue1");
                            }
                            else if (number < 500) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue2`);
                                _this.fishCalss.setHead("bigSwimBlue02");
                            }
                            else if (number < 1000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue3`);
                                _this.fishCalss.setHead("bigSwimBlue3");
                            }
                            else if (number < 2000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue4`);
                                _this.fishCalss.setHead("bigSwimBlue4");
                            }
                            else if (number < 5000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue5`);
                                _this.fishCalss.setHead("bigSwimBlue5");
                            }
                            else if (number < 8000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue6`);
                                _this.fishCalss.setHead("bigSwimBlue6");
                            }
                            else if (number < 10000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue7`);
                                _this.fishCalss.setHead("bigSwimBlue7");
                            }
                            else {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue7`);
                                _this.fishCalss.setHead("bigSwimBlue7");
                            }
                        }, _this);
                        timer_2.stop();
                        timer2.start();
                        _this.gameTxt.text = "" + (number -= 50);
                    }
                }, this);
                timer_2.start();
            }
        };
        GameScene.prototype.initFish = function () {
            var _this = this;
            this._fish = this._view.getChild("fish").asButton;
            this._view.setChildIndex(this._fish, 1);
            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", "bigSwim0");
            this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", "bigEye0");
            this._fish.draggable = true;
            this._fish.dragBounds = new egret.Rectangle(0, 0, fairygui.GRoot.inst.width - 15, fairygui.GRoot.inst.height);
            var timer = new egret.Timer(200, 1);
            this._fish.addEventListener(fairygui.DragEvent.DRAG_MOVING, function (ev) {
                _this.fishX.push(ev.stageX);
                var len = _this.fishX.length;
                if (len > 100) {
                    _this.fishX.splice(0, 50);
                }
                timer.addEventListener(egret.TimerEvent.TIMER, function () {
                    if (len > 2) {
                        var oldX = _this.fishX[len - 2];
                        var newX = _this.fishX[len - 1];
                        if (newX < oldX) {
                            _this._fish.scaleX = 1;
                        }
                        else {
                            _this._fish.scaleX = -1;
                        }
                    }
                }, _this);
                timer.start();
            }, this);
        };
        GameScene.prototype.fruitMonitor = function () {
        };
        return GameScene;
    }());
    TinyHeart.GameScene = GameScene;
    __reflect(GameScene.prototype, "TinyHeart.GameScene");
    var Fish = (function (_super) {
        __extends(Fish, _super);
        function Fish() {
            var _this = _super.call(this) || this;
            _this.fishXList = [];
            _this.initView();
            return _this;
        }
        Fish.prototype.initView = function () {
            var _this = this;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                Fish.main = _this;
                _this.width = 80;
                _this.height = 55;
                _this.x = _this.width / 2;
                _this.y = _this.height / 2;
                _this.anchorOffsetX = _this.width / 2;
                _this.anchorOffsetY = _this.height / 2;
                // var shp: egret.Shape = new egret.Shape();
                // shp.graphics.beginFill(0x000000, 1);
                // shp.graphics.drawRect(0, 0, this.width, this.height);
                // shp.graphics.endFill();
                // this.addChild(shp);
                _this.fishHeard = Utils.createBitmapByName('big');
                _this.addChild(_this.fishHeard);
                _this.fishHeard.x = 0;
                _this.fishHeard.y = _this.height / 2 - _this.fishHeard.height / 2;
                _this.fishEye = Utils.createBitmapByName('bigEye0');
                _this.addChild(_this.fishEye);
                _this.fishEyeX = _this.fishHeard.width / 2 - 6;
                _this.fishEye.x = _this.fishEyeX;
                _this.fishEyeY = _this.height / 2 - _this.fishEye.height / 2;
                _this.fishEye.y = _this.fishEyeY;
                _this.fishTail = Utils.createBitmapByName('bigTail0');
                _this.addChild(_this.fishTail);
                _this.fishTail.x = _this.width / 2 - 3;
                _this.fishTail.y = _this.height / 2 - _this.fishTail.height / 2;
                var data = RES.getRes("fishTill_json");
                var txtr = RES.getRes("fishTill_png");
                var timer = new egret.Timer(200, 1);
                GameScene.main.touchEnabled = true;
                GameScene.main.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (evt) {
                    // this.x = evt.stageX;
                    // this.y = evt.stageY;
                    var mx = evt.stageX;
                    var my = evt.stageY;
                    _this.x = Utils.lerpDistance(mx, _this.x, 0.9);
                    _this.y = Utils.lerpDistance(my, _this.y, 0.9);
                    var deltaY = my - _this.y;
                    var deltaX = mx - _this.x;
                    var beta = Math.atan2(deltaY, deltaX);
                    // this.rotation = Utils.lerpAngle(beta, this.rotation, 0.9);
                    _this.rotation = 360 * Math.atan(deltaY / deltaX) / (2 * Math.PI);
                    _this.fishXList.push(evt.stageX);
                    var len = _this.fishXList.length;
                    if (len > 100) {
                        _this.fishXList.splice(0, 50);
                    }
                    timer.addEventListener(egret.TimerEvent.TIMER, function () {
                        // if (len > 2) {
                        //     let oldX = this.fishXList[len - 2];
                        //     let newX = this.fishXList[len - 1];
                        //     if (newX < oldX) { this.rotation = 0; } else { this.rotation = 180; }
                        // }
                    }, _this);
                    timer.start();
                }, _this);
            }, this);
        };
        Fish.prototype.setHead = function (resName) {
            this.removeChild(this.fishHeard);
            this.fishHeard = Utils.createBitmapByName(resName);
            this.addChild(this.fishHeard);
            this.fishHeard.x = 0;
            this.fishHeard.y = this.height / 2 - this.fishHeard.height / 2;
        };
        Fish.prototype.setEye = function (resName) {
            this.removeChild(this.fishEye);
            this.fishEye = Utils.createBitmapByName(resName);
            this.addChild(this.fishEye);
            this.fishEye.x = this.fishEyeX;
            this.fishEye.y = this.fishEyeY;
        };
        return Fish;
    }(egret.DisplayObjectContainer));
    __reflect(Fish.prototype, "Fish");
    var Joystick = (function (_super) {
        __extends(Joystick, _super);
        function Joystick() {
            var _this = _super.call(this) || this;
            _this.shape = new egret.Shape();
            _this.touchArea = new egret.Shape();
            _this.point = Utils.createBitmapByName('point');
            _this.width = 200;
            _this.height = 200;
            _this.initTouchArea();
            _this.drawJoystick();
            return _this;
        }
        Joystick.prototype.initTouchArea = function () {
            var _this = this;
            this.touchArea.graphics.beginFill(0xffffff);
            this.touchArea.graphics.drawRect(0, 0, 200, 200);
            this.touchArea.graphics.endFill();
            this.touchArea.alpha = 0;
            this.touchArea.y = GameScene.main.height - 200;
            this.addChild(this.touchArea);
            this.touchArea.touchEnabled = true;
            this.touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.initPoint();
            }, this);
            this.touchArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (ev) {
                var rad = Math.atan2(ev.stageY, ev.stageX) * 180 / Math.PI;
                console.log(rad);
                _this.point.rotation = rad;
            }, this);
            this.touchArea.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.removePoint();
            }, this);
        };
        Joystick.prototype.drawJoystick = function () {
            this.shape.graphics.beginFill(0xdd4d4d);
            this.shape.graphics.drawCircle(0, 0, 15);
            this.shape.x = 115;
            this.shape.y = GameScene.main.height - 85;
            this.shape.anchorOffsetX = 15;
            this.shape.anchorOffsetY = 15;
            this.shape.graphics.endFill();
            this.addChild(this.shape);
        };
        Joystick.prototype.initPoint = function () {
            this.addChild(this.point);
            this.point.width = this.shape.width * 1.5;
            this.point.height = this.shape.height * 1.5;
            this.point.anchorOffsetX = this.shape.width * 1.5;
            this.point.anchorOffsetY = this.shape.width * 1.5;
            this.point.x = this.shape.x + 7;
            this.point.y = this.shape.y - 15;
        };
        Joystick.prototype.removePoint = function () {
            this.removeChild(this.point);
        };
        return Joystick;
    }(egret.DisplayObjectContainer));
    __reflect(Joystick.prototype, "Joystick");
})(TinyHeart || (TinyHeart = {}));
