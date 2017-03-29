import { Component } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { Quest } from '../../../model/quest';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { QuizPopupPage } from '../../central-pages/quiz-popup/quiz-popup';

@Component({
  selector: 'customer-quests',
  templateUrl: 'customer-quests.html'
})
export class CustomerQuestsPage {


  constructor(public modalCtrl: ModalController, public dataService: DataService, public navCtrl: NavController, public userService: UserService) {
  }

  submit(item: Quest) {
    let quizModal = this.modalCtrl.create(QuizPopupPage, { context: "complete-quest"});
    quizModal.onWillDismiss(value => {
      if (value === true) {
        this.dataService.completeQuest(item); 
      }
    });
    quizModal.present();
  }
}
