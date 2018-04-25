module TinyHeart {
    export class PlayGame {

        private _view: fairygui.GComponent;

        public constructor() {
            fairygui.UIPackage.addPackage("TinyHeart");

            this._view = fairygui.UIPackage.createObject("TinyHeart", "Play").asCom;
            this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);

            this._view.enabled = true;
            this._view.addClickListener((): void => {
                let gameScene: TinyHeart.GameScene = new TinyHeart.GameScene();
                Utils.enterScene(gameScene);
            }, this)
        }

        public getView(): fairygui.GComponent {
            return this._view;
        }
    }

    export class GameScene {

        private _view: fairygui.GComponent;
        private _fish: fairygui.GButton;
        private fishX: number[] = [];
        private fishCalss: Fish;
        // private _anys: Array<fairygui.GGraph> = [];
        private _anys: Array<egret.Shape> = [];
        private anyXY: Array<number>[] = [];
        private fruit: any;
        private gameTxt: fairygui.GTextField;
        public static main: eui.UILayer;

        public constructor() {
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

            let timer: egret.Timer = new egret.Timer(300, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.initFruit, this);
            timer.start();

            this.gameTxt = this._view.getChild('txt').asTextField;
            // GameScene.main.addChild(new Joystick());

            this.fishCalss = new Fish();
            GameScene.main.addChild(this.fishCalss);
        }

        public getView(): fairygui.GComponent {
            return this._view;
        }

        private initBtn(x: number = 0, y: number = 0, direction: string = "up"): void {
            let point = Utils.createBitmapByName("point");
            point.width = 40;
            point.height = 50;
            point.x = x;
            point.y = y;
            point.anchorOffsetX = point.width / 2;
            point.anchorOffsetY = point.height / 2;
            let self = this;
            point.touchEnabled = true;
            switch (direction) {
                case "left":
                    point.rotation = -90;
                    point.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (): void => {
                        console.log("left")
                    }, this)
                    break;
                case "right":
                    point.rotation = 90;
                    point.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (): void => {
                        console.log("right")
                    }, this)
                    break;
                case "up":
                    point.rotation = 0;
                    point.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (): void => {
                        console.log("up")
                    }, this)
                    break;
                case "down":
                    point.rotation = 180;
                    point.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (): void => {
                        console.log("down")
                    }, this)
                    break;
            }
            GameScene.main.addChild(point);
        }

        private initAny(): void {
            let anyNumber: number = 50;
            for (let i = 0; i < anyNumber; i++) {
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
                let any: egret.Shape = new egret.Shape();
                let moveNumber: number = 70;
                let index: number = 0;
                let moveX = i * 16 + Math.random() * 20,
                    moveY = GameScene.main.height;
                let p1X = moveX,
                    p1Y = moveY - 100;
                let p2X = moveX - moveNumber,
                    p2Y = moveY - (120 + Math.random() * 50);
                let timer: egret.Timer = new egret.Timer(20 + Math.random() * 2 + 1, 0);
                any.graphics.clear();
                any.graphics.lineStyle(16, 0x3b154e);
                any.graphics.moveTo(moveX, moveY);
                any.graphics.curveTo(p1X, p1Y, p2X, p2Y);
                any.alpha = 0.6;
                any.graphics.endFill();
                timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
                    if (index === 0) {
                        if (p2X < moveX + moveNumber) { p2X += 1; }
                        else { index = 1; }
                    } else if (index === 1) {
                        if (p2X > moveX - moveNumber) { p2X -= 1; }
                        else { index = 0; }
                    }
                    any.graphics.clear();
                    any.graphics.lineStyle(16, 0x3b154e);
                    any.graphics.moveTo(moveX, moveY);
                    any.graphics.curveTo(p1X, p1Y, p2X, p2Y);
                    any.alpha = 0.6;
                    any.graphics.endFill();
                    this.anyXY[i] = [p2X, p2Y, index];
                }, this)
                timer.start();
                this._anys.push(any);
            }
            for (let i = 0; i < anyNumber; i++) {
                // this._view.addChild(this._anys[i]);

                GameScene.main.addChild(this._anys[i]);
            }
        }

        private initFruit(): void {
            if (this.anyXY.length !== 0) {
                let index: number = Math.floor(Math.random() * 50);
                let self = this;
                let fruit = Utils.createBitmapByName("fruit");
                fruit.width = 16; fruit.height = 16;
                fruit.scaleX = 0; fruit.scaleY = 0;
                fruit.anchorOffsetX = fruit.width / 2;
                fruit.anchorOffsetY = fruit.height / 2;
                fruit.x = this.anyXY[index][0];
                fruit.y = this.anyXY[index][1];
                TinyHeart.GameScene.main.addChild(fruit);

                let fruitTween: egret.Tween = egret.Tween.get(fruit, {
                    onChange: function () {
                        if (fruit.scaleX === 1) {
                            let fruitTween2: egret.Tween = egret.Tween.get(fruit, {
                                onChange: function () {
                                    if (fruit.y <= 0) { TinyHeart.GameScene.main.removeChild(fruit); }
                                },
                                onChangeObj: fruit
                            }).to({ y: 0 }, Math.random() * 5000 + 2000)
                        } else {
                            let index2: number = self.anyXY[index][2];
                            if (index2 === 0) { fruit.x += 0.5; }
                            else if (index2 === 1) { fruit.x -= 0.5; }
                        }
                    },
                    onChangeObj: fruit
                }).to({ scaleX: 1, scaleY: 1 }, 1000)

                let count: number = 0;
                let enemyTime = 3;
                let timer: egret.Timer = new egret.Timer(10, 0);
                timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
                    count += 1;
                    // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat0`);
                    if (count >= enemyTime * 100) { this.initBlue(); count = 0; }
                    let recFruit = new egret.Rectangle(fruit.x, fruit.y, fruit.width, fruit.height);
                    // let recFish = new egret.Rectangle(self._fish.x, self._fish.y, self._fish.width, self._fish.height);
                    let recFish = new egret.Rectangle(self.fishCalss.x, self.fishCalss.y, self.fishCalss.width, self.fishCalss.height);
                    let hit = recFruit.intersects(recFish)
                    if (fruit.y <= 5) { timer.stop(); }
                    let number: number = parseFloat(this.gameTxt.text);
                    if (hit) {
                        fruit.visible = false;
                        // GameScene.main.removeChild(fruit);
                        // this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye1`);
                        this.fishCalss.setEye("bigEye1");
                        if (number < 50) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat0`);
                            this.fishCalss.setHead("bigEat0");
                        } else if (number < 100) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat1`);
                            this.fishCalss.setHead("bigEat1");
                        } else if (number < 500) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat2`);
                            this.fishCalss.setHead("bigEat2");
                        } else if (number < 1000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat3`);
                            this.fishCalss.setHead("bigEat3");
                        } else if (number < 2000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat4`);
                            this.fishCalss.setHead("bigEat4");
                        } else if (number < 5000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat5`);
                            this.fishCalss.setHead("bigEat5");
                        } else if (number < 8000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat6`);
                            this.fishCalss.setHead("bigEat6");
                        } else if (number < 10000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat7`);
                            this.fishCalss.setHead("bigEat7");
                        } else {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat7`);
                            this.fishCalss.setHead("bigEat7");
                        }
                        let timer2: egret.Timer = new egret.Timer(100, 1);
                        timer2.addEventListener(egret.TimerEvent.TIMER, (): void => {
                            // this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye0`);
                            self.fishCalss.setEye("bigEye0");
                            if (number < 50) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim0`);
                                this.fishCalss.setHead("bigSwim0");
                            } else if (number < 100) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim1`);
                                this.fishCalss.setHead("bigSwim1");
                            } else if (number < 500) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim2`);
                                this.fishCalss.setHead("bigSwim2");
                            } else if (number < 1000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim3`);
                                this.fishCalss.setHead("bigSwim3");
                            } else if (number < 2000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim4`);
                                this.fishCalss.setHead("bigSwim4");
                            } else if (number < 5000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim5`);
                                this.fishCalss.setHead("bigSwim5");
                            } else if (number < 8000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim6`);
                                this.fishCalss.setHead("bigSwim6");
                            } else if (number < 10000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim7`);
                                this.fishCalss.setHead("bigSwim7");
                            } else {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim7`);
                                this.fishCalss.setHead("bigSwim7");
                            }
                        }, this)
                        timer.stop();
                        timer2.start();
                        this.gameTxt.text = `${number += 10}`;
                    }

                }, this)
                timer.start();
            }
        }

        private initBlue(): void {
            if (this.anyXY.length !== 0) {
                let index: number = Math.floor(Math.random() * 50);
                let self = this;
                let blue = Utils.createBitmapByName("blue");
                blue.width = 16; blue.height = 16;
                blue.scaleX = 0; blue.scaleY = 0;
                blue.anchorOffsetX = blue.width / 2;
                blue.anchorOffsetY = blue.height / 2;
                if (this.anyXY.length !== 0) {
                    blue.x = this.anyXY[index][0];
                    blue.y = this.anyXY[index][1];
                }
                TinyHeart.GameScene.main.addChild(blue);

                let blueTween: egret.Tween = egret.Tween.get(blue, {
                    onChange: function () {
                        if (blue.scaleX === 1) {
                            let blueTween2: egret.Tween = egret.Tween.get(blue, {
                                onChange: function () {
                                    if (blue.y <= 0) { TinyHeart.GameScene.main.removeChild(blue); }
                                },
                                onChangeObj: blue
                            }).to({ y: 0 }, Math.random() * 5000 + 2000)
                        } else {
                            let index2: number = self.anyXY[index][2];
                            if (index2 === 0) { blue.x += 0.5; }
                            else if (index2 === 1) { blue.x -= 0.5; }
                        }
                    },
                    onChangeObj: blue
                }).to({ scaleX: 1, scaleY: 1 }, 1000)

                let timer: egret.Timer = new egret.Timer(10, 0);
                timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
                    let recBlue = new egret.Rectangle(blue.x, blue.y, blue.width, blue.height);
                    // let recFish = new egret.Rectangle(self._fish.x, self._fish.y, self._fish.width, self._fish.height);
                    let recFish = new egret.Rectangle(self.fishCalss.x, self.fishCalss.y, self.fishCalss.width, self.fishCalss.height);
                    let hit = recBlue.intersects(recFish)
                    if (blue.y <= 5) { timer.stop(); }
                    let number: number = parseFloat(this.gameTxt.text);
                    if (hit) {
                        blue.visible = false;
                        // this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye1`);
                        this.fishCalss.setEye("bigEye1");
                        if (number < 50) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue0`);
                            this.fishCalss.setHead("bigEatBlue0");
                        } else if (number < 100) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue1`);
                            this.fishCalss.setHead("bigEatBlue1");
                        } else if (number < 500) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue2`);
                            this.fishCalss.setHead("bigEatBlue2");
                        } else if (number < 1000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue3`);
                            this.fishCalss.setHead("bigEatBlue3");
                        } else if (number < 2000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue4`);
                            this.fishCalss.setHead("bigEatBlue4");
                        } else if (number < 5000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue5`);
                            this.fishCalss.setHead("bigEatBlue5");
                        } else if (number < 8000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue6`);
                            this.fishCalss.setHead("bigEatBlue6");
                        } else if (number < 10000) {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue7`);
                            this.fishCalss.setHead("bigEatBlue7");
                        } else {
                            // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue7`);
                            this.fishCalss.setHead("bigEatBlue7");
                        }
                        let timer2: egret.Timer = new egret.Timer(100, 1);
                        timer2.addEventListener(egret.TimerEvent.TIMER, (): void => {
                            // this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye0`);
                            this.fishCalss.setEye("bigEye0");
                            if (number < 50) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue0`);
                                this.fishCalss.setHead("bigSwimBlue0");
                            } else if (number < 100) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue1`);
                                this.fishCalss.setHead("bigSwimBlue1");
                            } else if (number < 500) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue2`);
                                this.fishCalss.setHead("bigSwimBlue02");
                            } else if (number < 1000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue3`);
                                this.fishCalss.setHead("bigSwimBlue3");
                            } else if (number < 2000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue4`);
                                this.fishCalss.setHead("bigSwimBlue4");
                            } else if (number < 5000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue5`);
                                this.fishCalss.setHead("bigSwimBlue5");
                            } else if (number < 8000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue6`);
                                this.fishCalss.setHead("bigSwimBlue6");
                            } else if (number < 10000) {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue7`);
                                this.fishCalss.setHead("bigSwimBlue7");
                            } else {
                                // this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue7`);
                                this.fishCalss.setHead("bigSwimBlue7");
                            }
                        }, this)
                        timer.stop();
                        timer2.start();
                        this.gameTxt.text = `${number -= 50}`;
                    }
                }, this)
                timer.start();
            }
        }

        private initFish(): void {
            this._fish = this._view.getChild("fish").asButton;
            this._view.setChildIndex(this._fish, 1);
            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim0`);
            this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye0`);
            this._fish.draggable = true;
            this._fish.dragBounds = new egret.Rectangle(0, 0, fairygui.GRoot.inst.width - 15, fairygui.GRoot.inst.height);
            let timer: egret.Timer = new egret.Timer(200, 1);
            this._fish.addEventListener(fairygui.DragEvent.DRAG_MOVING, (ev): void => {
                this.fishX.push(ev.stageX);
                let len = this.fishX.length;
                if (len > 100) { this.fishX.splice(0, 50); }
                timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
                    if (len > 2) {
                        let oldX = this.fishX[len - 2];
                        let newX = this.fishX[len - 1];
                        if (newX < oldX) { this._fish.scaleX = 1; } else { this._fish.scaleX = -1; }
                    }
                }, this)
                timer.start();
            }, this)
        }


        private fruitMonitor(): void {
        }
    }

    class Fish extends egret.DisplayObjectContainer {
        private static main;
        private fishHeard: egret.Bitmap;
        private fishEye: egret.Bitmap;
        private fishEyeX: number;
        private fishEyeY: number;
        private fishTail: egret.Bitmap;
        private fishXList: number[] = [];
        public constructor() {
            super();
            this.initView();
        }

        private initView() {
            this.addEventListener(egret.Event.ADDED_TO_STAGE, (): void => {
                Fish.main = this;
                this.width = 80;
                this.height = 55;
                this.x = this.width / 2;
                this.y = this.height / 2;
                this.anchorOffsetX = this.width / 2;
                this.anchorOffsetY = this.height / 2;

                // var shp: egret.Shape = new egret.Shape();
                // shp.graphics.beginFill(0x000000, 1);
                // shp.graphics.drawRect(0, 0, this.width, this.height);
                // shp.graphics.endFill();
                // this.addChild(shp);

                this.fishHeard = Utils.createBitmapByName('big');
                this.addChild(this.fishHeard);
                this.fishHeard.x = 0;
                this.fishHeard.y = this.height / 2 - this.fishHeard.height / 2;

                this.fishEye = Utils.createBitmapByName('bigEye0');
                this.addChild(this.fishEye);
                this.fishEyeX = this.fishHeard.width / 2 - 6;
                this.fishEye.x = this.fishEyeX;
                this.fishEyeY = this.height / 2 - this.fishEye.height / 2;
                this.fishEye.y = this.fishEyeY;

                this.fishTail = Utils.createBitmapByName('bigTail0');
                this.addChild(this.fishTail);
                this.fishTail.x = this.width / 2 - 3;
                this.fishTail.y = this.height / 2 - this.fishTail.height / 2;

                let data = RES.getRes("fishTill_json");
                let txtr = RES.getRes("fishTill_png");

                let timer: egret.Timer = new egret.Timer(200, 1);
                GameScene.main.touchEnabled = true;
                GameScene.main.addEventListener(egret.TouchEvent.TOUCH_MOVE, (evt: egret.TouchEvent): void => {
                    // this.x = evt.stageX;
                    // this.y = evt.stageY;
                    let mx = evt.stageX;
                    let my = evt.stageY
                    this.x = Utils.lerpDistance(mx, this.x, 0.9);
                    this.y = Utils.lerpDistance(my, this.y, 0.9);

                    let deltaY = my - this.y;
                    let deltaX = mx - this.x;
                    let beta = Math.atan2(deltaY, deltaX);
                    // this.rotation = Utils.lerpAngle(beta, this.rotation, 0.9);
                    this.rotation = 360 * Math.atan(deltaY / deltaX) / (2 * Math.PI);


                    this.fishXList.push(evt.stageX);
                    let len = this.fishXList.length;
                    if (len > 100) { this.fishXList.splice(0, 50); }
                    timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
                        // if (len > 2) {
                        //     let oldX = this.fishXList[len - 2];
                        //     let newX = this.fishXList[len - 1];
                        //     if (newX < oldX) { this.rotation = 0; } else { this.rotation = 180; }
                        // }
                    }, this)
                    timer.start();
                }, this)

            }, this)
        }

        public setHead(resName: string): void {
            this.removeChild(this.fishHeard);
            this.fishHeard = Utils.createBitmapByName(resName);
            this.addChild(this.fishHeard);
            this.fishHeard.x = 0;
            this.fishHeard.y = this.height / 2 - this.fishHeard.height / 2;
        }

        public setEye(resName: string): void {
            this.removeChild(this.fishEye);
            this.fishEye = Utils.createBitmapByName(resName);
            this.addChild(this.fishEye);
            this.fishEye.x = this.fishEyeX;
            this.fishEye.y = this.fishEyeY;
        }

        // public
    }

    class Joystick extends egret.DisplayObjectContainer {
        private shape: egret.Shape = new egret.Shape();
        private touchArea: egret.Shape = new egret.Shape();
        private point: egret.Bitmap = Utils.createBitmapByName('point');

        public constructor() {
            super();
            this.width = 200;
            this.height = 200;
            this.initTouchArea();
            this.drawJoystick();
        }

        private initTouchArea(): void {

            this.touchArea.graphics.beginFill(0xffffff);
            this.touchArea.graphics.drawRect(0, 0, 200, 200);
            this.touchArea.graphics.endFill();
            this.touchArea.alpha = 0;
            this.touchArea.y = GameScene.main.height - 200;
            this.addChild(this.touchArea);

            this.touchArea.touchEnabled = true;
            this.touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (): void => {
                this.initPoint();
            }, this)
            this.touchArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, (ev: egret.TouchEvent): void => {
                let rad: number = Math.atan2(ev.stageY, ev.stageX) * 180 / Math.PI;
                console.log(rad);
                this.point.rotation = rad;
            }, this)
            this.touchArea.addEventListener(egret.TouchEvent.TOUCH_END, (): void => {
                this.removePoint();
            }, this)
        }

        private drawJoystick(): void {

            this.shape.graphics.beginFill(0xdd4d4d);
            this.shape.graphics.drawCircle(0, 0, 15);
            this.shape.x = 115;
            this.shape.y = GameScene.main.height - 85;
            this.shape.anchorOffsetX = 15;
            this.shape.anchorOffsetY = 15;
            this.shape.graphics.endFill();
            this.addChild(this.shape);
        }

        private initPoint(): void {

            this.addChild(this.point);
            this.point.width = this.shape.width * 1.5;
            this.point.height = this.shape.height * 1.5;
            this.point.anchorOffsetX = this.shape.width * 1.5;
            this.point.anchorOffsetY = this.shape.width * 1.5;
            this.point.x = this.shape.x + 7;
            this.point.y = this.shape.y - 15;
        }

        private removePoint(): void {
            this.removeChild(this.point);
        }
    }
}