import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Player } from '../model/player';
import { Order } from '../model/order';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { GameOverPage } from '../pages/game-over/game-over';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserService } from '../services/user.service';
import { ScoreboardEntry } from '../model/scoreboardEntry';
import { Quest } from '../model/quest';
import { ToastController, Events } from 'ionic-angular';
import { OrderAttribute } from '../model/order-attribute';
import { Machine } from '../model/machine';
import { Slide } from '../model/slide';
import { Question } from '../model/question';

@Injectable()
export class DataService {
    url: string = "http://v22017024302944644.powersrv.de:8080/industrie.demo/rest/test/";
    //url: string = "http://localhost:8080/industrie.demo/rest/test/";
    COUCH_DB_URL: string = "http://5.45.99.65:5984/";
    private timer;

    questions: { [key: string]: Question[] } = {};

    constructor(public events: Events, private http: Http, private userService: UserService, private toastCtrl: ToastController) { }

    getPregameGamestate(): Observable<boolean> {
        return this.http.get(this.url + "pregame/get-gamestate").map((res: Response) => res.json() as boolean);
    }
    setActiveMachine(machineId: number) {
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append("GroupId", this.userService.currentPlayer.groupId.toString());
        options.headers.append("UserId", this.userService.currentPlayer.playerId.toString());

        this.http.get(this.url + "producer/set-machine/machine-id/" + machineId, options).map((res: Response) => {
            this.useGameState(res.json())
        }).subscribe((success) => {
            this.resetTimer();
        }, (err) => {
            this.error(err);
        });
    }

    registerGroup(code: string): Observable<number> {
        return this.http.get(this.url + "group/register-new-group/qr-code/" + code).map((res: Response) => res.json());
    }
    registerPlayer(name: string): Observable<number> {
        if (this.userService.currentPlayer.role === undefined) {
            alert("something went wrong: ErrorCode 2");
        }
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append("GroupId", this.userService.currentPlayer.groupId.toString());
        return this.http.get(this.url + this.userService.currentPlayer.role + "/register-new/username/" + name, options)
            .map((res: Response) =>
                res.json()
            );
    }
    repairMachine(machineId: number) {
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append("GroupId", this.userService.currentPlayer.groupId.toString());
        options.headers.append("UserId", this.userService.currentPlayer.playerId.toString());

        this.http.get(this.url + "producer/repair-machine/machine-id/" + machineId, options).map((res: Response) => this.useGameState(res.json()))
            .subscribe((success) => { console.log(success); this.resetTimer(); }, (err) => { this.error(err); });
    }
    submitOrder(qrCode: string, ammount: number) {
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append("GroupId", this.userService.currentPlayer.groupId.toString());
        options.headers.append("UserId", this.userService.currentPlayer.playerId.toString());

        this.http.get(this.url + "consumer/submit-order/qr-code/" + qrCode + "/" + ammount, options).map((res: Response) => this.useGameState(res.json()))
            .subscribe((success) => { console.log(success); this.resetTimer(); }, (err) => { this.error(err); });
    }
    completeQuest(quest: Quest) {
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append("GroupId", this.userService.currentPlayer.groupId.toString());
        options.headers.append("UserId", this.userService.currentPlayer.playerId.toString());
        options.headers.append("QuestId", quest.id.toString());

        this.http.get(this.url + "consumer/complete-quest", options).map((res: Response) => this.useGameState(res.json()))
            .subscribe((success) => { console.log(success); this.resetTimer(); }, (err) => this.error(err));
    }

    approveOrder(product: Product) {
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append("OrderId", product.id.toString());
        options.headers.append("GroupId", this.userService.currentPlayer.groupId.toString());
        options.headers.append("UserId", this.userService.currentPlayer.playerId.toString());

        this.http.get(this.url + "producer/approve-order", options).map((res: Response) => this.useGameState(res.json()))
            .subscribe((success) => { console.log(success); this.resetTimer(); }, (err) => this.error(err));
    }

    getSlides(): Observable<Array<Slide>> {
        return this.http.get(this.COUCH_DB_URL + "slides/_design/slides/_view/" + this.userService.currentPlayer.role + "-all").map((res) => res.json());
    }

    getQuestion(anchor: string): Observable<Question> {
        return Observable.create(observer => {
            if (!this.questions[this.userService.currentPlayer.role + "-" + anchor] || this.questions[this.userService.currentPlayer.role + "-" + anchor].length === 0) {
                this.http.get(this.COUCH_DB_URL + "questions/_design/questions/_view/" + this.userService.currentPlayer.role + "-" + anchor)
                    .map((res) => res.json()).subscribe((data) => {
                        this.questions[this.userService.currentPlayer.role + "-" + anchor] = new Array<Question>();

                        if (data['rows'].length > 0) {
                            data['rows'].forEach((elem) => {
                                this.questions[this.userService.currentPlayer.role + "-" + anchor].push(elem.value as Question);
                            });
                            observer.next(this.questions[this.userService.currentPlayer.role + "-" + anchor].pop());
                        } else {
                            observer.error("no questions");
                        }

                        observer.complete();
                    }, (error) => {
                        observer.error(error);
                        observer.complete();
                    });
            } else {
                observer.next(this.questions[this.userService.currentPlayer.role + "-" + anchor].pop());
                observer.complete();
            }
        });
    }

    cancelOrder(id: number) {
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append("OrderId", id.toString());
        options.headers.append("GroupId", this.userService.currentPlayer.groupId.toString());
        options.headers.append("UserId", this.userService.currentPlayer.playerId.toString());

        this.http.get(this.url + "consumer/cancel-order", options).map((res: Response) => this.useGameState(res.json())).subscribe((success) => { });
    }

    hasGameStarted(): Observable<boolean> {
        return this.http.get(this.url + "has-game-started").map((response) => response.json() as boolean);
    }

    useGameState(data: any): any {
        let newQueue: Array<Product> = new Array<Product>();
        let newCompleted: Array<Product> = new Array<Product>();
        let newWaiting: Array<Product> = new Array<Product>();

        this.userService.timeRemaining = data.timeRemaining;

        data.orders.forEach(element => {

            let product: Product;
            this.userService.productQueue.find((prodct) => {
                if (prodct.id == element.id) {
                    product = prodct;
                    return true;
                } else {
                    return false;
                }
            })
            if (product == null)
                product = new Product();

            if (element.status === "completed") {
                newCompleted.push(product);
            } else if (element.status === "started") {
                newQueue.push(product);
            } else if (element.status === "waiting") {
                newWaiting.push(product);
            }
            product.id = element.id;
            product.currentProgress = element.progress;
            product.ammount = element.ammount;
            product.type = element.type;

            for (let x = 0; x < 3; x++) {
                product.fauRehauAttributes[x].currentValue = element.fauRehauAttributes[x].currentValue;
                product.fauRehauAttributes[x].maxValue = element.fauRehauAttributes[x].maxValue;
                product.fauRehauAttributes[x].minValue = element.fauRehauAttributes[x].minValue;
                product.fauRehauAttributes[x].name = element.fauRehauAttributes[x].name;
                product.fauRehauAttributes[x].optimalValue = element.fauRehauAttributes[x].optimalValue;
            }
            console.log(product);
        });

        data.messages.forEach(element => {
            let toast = this.toastCtrl.create({
                message: element,
                duration: 3000,
                position: 'bottom'
            });
            toast.present();
        });

        this.userService.setScoreboard(data.scoreboard);

        if (this.userService.currentPlayer.role === "consumer") {
            let questLog: Array<Quest> = new Array<Quest>();

            this.userService.questQueue = data.quests;
            this.userService.questsDone = data.questsDone;

            this.userService.currentPlayer.lightWeight = data.inventory.lightProducts;
            this.userService.currentPlayer.midWeight = data.inventory.medProducts;
            this.userService.currentPlayer.proWeight = data.inventory.proProducts;
        } else {
            this.userService.currentPlayer.machines = data.machines;
            this.userService.currentPlayer.brokenMachines = new Array<Machine>();
            data.machines.forEach(element => {
                if (element.status === "NEED_REPAIR")
                    this.userService.currentPlayer.brokenMachines.push(element);
            })
        }
        this.userService.currentPlayer.currentScore = data.score;
        this.userService.currentPlayer.currentMoney = data.money;
        this.userService.productQueue = newQueue;
        this.userService.productsDone = newCompleted;
        this.userService.productsWaiting = newWaiting;
        return data;
    }
    resetTimer() {
        if (this.timer != undefined) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(this.getGameState.bind(this), 2500);
    }
    getGameState() {
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append("GroupId", this.userService.currentPlayer.groupId.toString());
        options.headers.append("UserId", this.userService.currentPlayer.playerId.toString());

        console.log("tick for: uid -> " + this.userService.currentPlayer.playerId + "; gid -> " + this.userService.currentPlayer.groupId);

        return this.http.get(this.url + this.userService.currentPlayer.role + "/get-gamestate", options).map((res: Response) => this.useGameState(res.json()))
            .subscribe((success) => console.log(success), (err) => this.error(err));
    }

    error(err: any) {
        let msg: string;

        if (err.status === 404) {
            msg = "Fehler mit der Verbindung zum Server";
        } else if (err.status === 403) {
            this.events.publish('game:finished');
            clearInterval(this.timer);
        } else if (err.status === 409) {
            msg = "Name bereits vergeben";
        }  else if (err.status === 412) {
            msg = "Es stehen nicht genug Ressourcen zur Verfügung";
        } else if (err.status === 413) {
            msg = "Ausgewählte Maschine ist beschäftigt";
        } else if (err.status === 406) {
            msg = "Game "
        } else {
            msg = "Unerwateter Serverfehler + err";
        }

        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'middle'
        });
        toast.present();
    }
}