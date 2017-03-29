import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { NavController, ToastController } from 'ionic-angular';
import { OrderAttribute } from '../../../model/order-attribute';
import { DataService } from '../../../services/data.service';
import { Question } from '../../../model/question';
import { Option } from '../../../model/option';

@Component({
    selector: 'quiz-popup',
    templateUrl: 'quiz-popup.html'
})
export class QuizPopupPage {
    context: string = "";
    question: Question;

    constructor(private viewCtrl: ViewController, private toastController: ToastController, private dataService: DataService, params: NavParams) {
        this.context = params.get('context');
        this.dataService.getQuestion(this.context).subscribe((success) => {
            this.question = success;
        }, (error) => {
            this.viewCtrl.dismiss(true);
        });
    }
    solveQuiz(option: Option) {
        if (option.isRightAnswer === true) {
            this.viewCtrl.dismiss(true);
        } else {
            let toast = this.toastController.create(({
                message: "Leider falsch! Versuchen Sie es erneut",
                position: "middle",
                duration: 2100
            }))
            toast.present();
            this.viewCtrl.dismiss(false);
        }
    }
}
