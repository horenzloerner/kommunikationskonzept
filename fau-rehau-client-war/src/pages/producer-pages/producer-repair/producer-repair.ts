import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { DataService } from '../../../services/data.service';
import { Product } from '../../../model/product';
import { UserService } from '../../../services/user.service';
import { Machine } from '../../../model/machine';
import { QuizPopupPage } from '../../central-pages/quiz-popup/quiz-popup';

@Component({
  selector: 'producer-repair',
  templateUrl: 'producer-repair.html'
})
export class ProducerRepairPage {

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, private dataService: DataService, private userService: UserService) {
  }

  repair(machine: Machine) {
    let quizModal = this.modalCtrl.create(QuizPopupPage, { context: "repair" });
    quizModal.onWillDismiss(value => {
      if (value === true) {
        this.dataService.repairMachine(machine.id);
      }
    });
    quizModal.present();
  }
}
