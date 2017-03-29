import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { DataService } from '../../../services/data.service';
import { Product } from '../../../model/product';
import { UserService } from '../../../services/user.service';
import { QuizPopupPage } from '../../central-pages/quiz-popup/quiz-popup';

@Component({
  selector: 'producer-order',
  templateUrl: 'producer-order.html'
})
export class ProducerOrderPage {

  producerOrderPage = ProducerOrderPage;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, private dataService: DataService, private userService: UserService) {
    }
  approveOrder(product: Product) {
        let quizModal = this.modalCtrl.create(QuizPopupPage, { context: "approve-order"});
    quizModal.onWillDismiss(value => {
      if (value === true) {
        this.dataService.approveOrder(product);
      }
    });
    quizModal.present();
  }
}
