import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { QuizPopupPage } from '../../central-pages/quiz-popup/quiz-popup';

@Component({
  selector: 'customer-order',
  templateUrl: 'customer-submit.html'
})
export class CustomerSubmitPage {
  ammount: number;

  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController, public navCtrl: NavController, public userService: UserService, public dataService: DataService) {

  }
  scanCode() {
    let quizModal = this.modalCtrl.create(QuizPopupPage, { context: "submit-order" });

    quizModal.onWillDismiss(value => {
      if (value === true) {
        BarcodeScanner.scan().then((barcodeData) => {
          // Success! Barcode data is here
          this.dataService.submitOrder(barcodeData.text, this.ammount);
        }, (err) => {
          // An error occurred
          let alert = this.alertCtrl.create({
            title: 'Fehler!',
            subTitle: 'Folgender Fehler ist aufgetreten' + err,
            ////      buttons: ['OK']
          });
          alert.present();
        });
      }
    });
    quizModal.present();

  }

}
