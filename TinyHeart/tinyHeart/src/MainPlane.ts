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
        private fishX: number[] = []
        private _anys: Array<fairygui.GGraph> = [];
        private anyY: number[] = [];
        private fruit: any;
        private gameTxt: fairygui.GTextField;
        public static main: eui.UILayer;

        public constructor() {
            fairygui.UIPackage.addPackage("TinyHeart");

            this._view = fairygui.UIPackage.createObject("TinyHeart", "Main").asCom;
            this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);

            // let shape: TinyHeart.Ane = new TinyHeart.Ane();
            // TinyHeart.GameScene.main.addChild(shape);
            this.initFish();
            this.initAny();
            this.initFruit();

            let timer: egret.Timer = new egret.Timer(300, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.initFruit, this);
            timer.start();

            this.gameTxt = this._view.getChild('txt').asTextField;
        }

        public getView(): fairygui.GComponent {
            return this._view;
        }

        private initAny(): void {
            let anyNumber: number = 50;
            for (let i = 0; i < anyNumber; i++) {
                let any: fairygui.GGraph = new fairygui.GGraph();
                any.setSize(16, 200);
                any.drawRect(0, 0xfff, 0, 0x3b154e, 0.6, [16, 16, 16, 16]);
                any.height = 150 + Math.random() * 50;
                any.x = i * 16 + Math.random() * 20;
                any.y = fairygui.GRoot.inst.height - any.height + 50;
                this._anys.push(any);
                this.anyY.push(any.y);
            }
            for (let i = 0; i < anyNumber; i++) {
                this._view.addChild(this._anys[i]);
            }
        }

        private initFruit(): void {
            let index: number = Math.floor(Math.random() * 50);
            let self = this;
            let fruit = Utils.createBitmapByName("fruit");
            fruit.width = 16; fruit.height = 16;
            fruit.scaleX = 0; fruit.scaleY = 0;
            fruit.anchorOffsetX = fruit.width / 2;
            fruit.anchorOffsetY = fruit.height / 2;
            fruit.x = index * 16 + Math.random() * 20;
            fruit.y = this.anyY[index];
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
                let recFish = new egret.Rectangle(self._fish.x, self._fish.y, self._fish.width, self._fish.height);
                let hit = recFruit.intersects(recFish)
                if (fruit.y <= 5) { timer.stop(); }
                let number: number = parseFloat(this.gameTxt.text);
                if (hit) {
                    fruit.visible = false;
                    this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye1`);
                    if (number < 50) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat0`);
                    } else if (number < 100) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat1`);
                    } else if (number < 500) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat2`);
                    } else if (number < 1000) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat3`);
                    } else if (number < 2000) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat4`);
                    } else if (number < 5000) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat5`);
                    } else if (number < 8000) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat6`);
                    } else if (number < 10000) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat7`);
                    } else {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEat7`);
                    }
                    let timer2: egret.Timer = new egret.Timer(100, 1);
                    timer2.addEventListener(egret.TimerEvent.TIMER, (): void => {
                        this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye0`);
                        if (number < 50) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim0`);
                        } else if (number < 100) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim1`);
                        } else if (number < 500) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim2`);
                        } else if (number < 1000) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim3`);
                        } else if (number < 2000) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim4`);
                        } else if (number < 5000) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim5`);
                        } else if (number < 8000) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim6`);
                        } else if (number < 10000) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim7`);
                        } else {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwim7`);
                        }
                    }, this)
                    timer.stop();
                    timer2.start();
                    this.gameTxt.text = `${number += 10}`;
                }

            }, this)
            timer.start();
        }

        private initBlue(): void {
            let index: number = Math.floor(Math.random() * 50);
            let self = this;
            let blue = Utils.createBitmapByName("blue");
            blue.width = 16; blue.height = 16;
            blue.scaleX = 0; blue.scaleY = 0;
            blue.anchorOffsetX = blue.width / 2;
            blue.anchorOffsetY = blue.height / 2;
            blue.x = index * 16 + Math.random() * 20;
            blue.y = this.anyY[index];
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
                    }
                },
                onChangeObj: blue
            }).to({ scaleX: 1, scaleY: 1 }, 1000)

            let timer: egret.Timer = new egret.Timer(10, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, (): void => {
                let recBlue = new egret.Rectangle(blue.x, blue.y, blue.width, blue.height);
                let recFish = new egret.Rectangle(self._fish.x, self._fish.y, self._fish.width, self._fish.height);
                let hit = recBlue.intersects(recFish)
                if (blue.y <= 5) { timer.stop(); }
                let number: number = parseFloat(this.gameTxt.text);
                if (hit) {
                    blue.visible = false;
                    this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye1`);
                    if (number < 50) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue0`);
                    } else if (number < 100) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue1`);
                    } else if (number < 500) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue2`);
                    } else if (number < 1000) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue3`);
                    } else if (number < 2000) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue4`);
                    } else if (number < 5000) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue5`);
                    } else if (number < 8000) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue6`);
                    } else if (number < 10000) {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue7`);
                    } else {
                        this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEatBlue7`);
                    }
                    let timer2: egret.Timer = new egret.Timer(100, 1);
                    timer2.addEventListener(egret.TimerEvent.TIMER, (): void => {
                        this._fish.getChild("eye").asButton.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigEye0`);
                        if (number < 50) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue0`);
                        } else if (number < 100) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue1`);
                        } else if (number < 500) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue2`);
                        } else if (number < 1000) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue3`);
                        } else if (number < 2000) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue4`);
                        } else if (number < 5000) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue5`);
                        } else if (number < 8000) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue6`);
                        } else if (number < 10000) {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue7`);
                        } else {
                            this._fish.icon = fairygui.UIPackage.getItemURL("TinyHeart", `bigSwimBlue7`);
                        }
                    }, this)
                    timer.stop();
                    timer2.start();
                    this.gameTxt.text = `${number -= 50}`;
                }
            }, this)
            timer.start();
        }

        private initFish(): void {
            this._fish = this._view.getChild("fish").asButton;
            // this._fish.sortingOrder = 5;
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

    export class Ane extends egret.Shape {

        public constructor() {
            super();
            this.drawAny();
        }

        private drawAny(): void {
            this.graphics.beginFill(0x84157b);
            this.graphics.drawRect(0, 0, 50, 50);
            this.graphics.endFill();
        }
    }
}