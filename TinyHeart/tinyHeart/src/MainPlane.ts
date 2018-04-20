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
        private _anys: Array<fairygui.GGraph> = [];
        private _fruits: Array<fairygui.GImage> = [];
        public static main: eui.UILayer;
        private anyY: number[] = [];

        public constructor() {
            fairygui.UIPackage.addPackage("TinyHeart");

            this._view = fairygui.UIPackage.createObject("TinyHeart", "Main").asCom;
            this._view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);

            // let shape: TinyHeart.Ane = new TinyHeart.Ane();
            // TinyHeart.GameScene.main.addChild(shape);
            this.initAny();
            this.initFruit();

            let timer: egret.Timer = new egret.Timer(500, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.fruitMonitor, this);
            timer.start();


            this._fish = this._view.getChild("fish").asButton;
            // this._fish.sortingOrder = 5;
            this._fish.draggable = true;
            this._fish.dragBounds = new egret.Rectangle(0, 0, fairygui.GRoot.inst.width - 15, fairygui.GRoot.inst.height);
            let fishStartX: number = 0;
            let fishMovex: number = 0;
            this._fish.addEventListener(fairygui.DragEvent.DRAG_START, (ev): void => {
                fishStartX = ev.stageX;
            }, this)
            this._fish.addEventListener(fairygui.DragEvent.DRAG_MOVING, (ev): void => {
                fishMovex = ev.stageX;
                if (fishStartX > fishMovex) {
                    console.log('left')
                } else {
                    console.log('right')
                }
            }, this)
            this._fish.addEventListener(fairygui.DragEvent.DRAG_END, (): void => {
                console.log('end')
            }, this)
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
            let fruinNumber: number = 50;
            for (let i = 0; i < fruinNumber; i++) {
                let fruit: fairygui.GImage = fairygui.UIPackage.createObject("TinyHeart", "fruit").asImage;
                fruit.setSize(16, 16);
                fruit.setPivot(0.5, 0.5);
                fruit.setScale(0, 0);
                fruit.x = i * 16 + Math.random() * 20;
                fruit.y = this.anyY[i]
                this._fruits.push(fruit);
            }
        }


        private fruitMonitor(): void {
            let self = this;
            for (let i = 0; i < this._fruits.length; i++) {
                let fruit = this._fruits.splice(Math.floor(Math.random() * this._fruits.length - 1), 1)[0];
                let fruitTween: egret.Tween = egret.Tween.get(fruit, {
                    onChange: function () {
                        if (fruit.scaleX === 1) {
                            let fruitTween2: egret.Tween = egret.Tween.get(fruit, {
                                onChange: function () {
                                    if (fruit.y < 16 && self._fruits.length === 0) {
                                        console.log(1)
                                        return
                                    }
                                },
                                onChangeObj: fruit
                            }).to({ y: -16 }, Math.random() * 5000 + 2000)
                        }
                    },
                    onChangeObj: fruit
                }).to({ scaleX: 1, scaleY: 1 }, 1000)
                this._view.addChild(fruit);
                console.log(this._fruits[1].y)
            }
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