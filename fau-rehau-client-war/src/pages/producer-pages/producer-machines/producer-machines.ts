import { Component } from "@angular/core";
import { DataService } from "./../../../services/data.service";
import { UserService } from "./../../../services/user.service";
import { ModalController } from 'ionic-angular';
import { QuizPopupPage } from '../../central-pages/quiz-popup/quiz-popup';

@Component({
    templateUrl: "producer-machines.html",
    selector: "producer-machines"
})
export class ProducerMachinesPage {
    constructor(public modalCtrl: ModalController, private dataService: DataService, private userService: UserService) {
    }
    setMachine(i: number) {

        let quizModal = this.modalCtrl.create(QuizPopupPage, { context: "set-machine" });
        quizModal.onWillDismiss(value => {
            if (value === true) {
                this.dataService.setActiveMachine(i);
            }
        });
        quizModal.present();
    }
}