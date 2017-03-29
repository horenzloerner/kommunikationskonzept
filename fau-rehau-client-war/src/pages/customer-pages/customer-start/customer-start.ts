import { Component } from '@angular/core';

import { NavController, ModalController, Events } from 'ionic-angular';
import { CustomerOrderPage } from '../customer-order/customer-order';
import { CustomerOverviewPage } from '../customer-overview/customer-overview';
import { CustomerScorePage } from '../customer-score/customer-score';
import { CustomerOrdersPage } from '../customer-orders/customer-orders';
import { QuizPopupPage } from '../../central-pages/quiz-popup/quiz-popup';
import { DataService } from '../../../services/data.service';
import { UserService } from '../../../services/user.service';
import { Slide } from '../../../model/slide';
import { GameOverPage } from '../../game-over/game-over';

@Component({
  selector: 'customer-start',
  templateUrl: 'customer-start.html'
})
export class CustomerStartPage {
  slides: Array<Slide> = new Array<Slide>();

  currentTopMargin: number = 56;
  currentBottomMargin: number = 0;
  customerScorePage: any = CustomerScorePage;
  customerOrderPage: any = CustomerOrderPage;
  customerOverviewPage: any = CustomerOverviewPage;
  customerOrdersPage: any = CustomerOrdersPage;
  chargenTutorial: boolean;
  mainTutorial: boolean = true;

  nextTutorial() {

  }

  opacity: number = 1;

  playNow() {
            this.opacity = 0;

    this.dataService.hasGameStarted().subscribe((success) => {
      if (success === true) {
        let quizModal = this.modalCtrl.create(QuizPopupPage, { context: "pregame" });
        quizModal.onWillDismiss(value => {
          if (value === true) {
            this.dataService.resetTimer();
            this.mainTutorial = false;
            this.userService.hasEnteredGame = true;
          } else {
            this.opacity = 1;
          }
        });
        quizModal.present();
      } else {
        alert("Das Spiel wurde noch nicht gestartet");
      }
    })
  }

  constructor(public event: Events, public modalCtrl: ModalController, public navCtrl: NavController, private userService: UserService, private dataService: DataService) {
    event.subscribe('game:finished', () => {
      this.navCtrl.setRoot(GameOverPage);
    });
    this.dataService.getSlides().subscribe((success) => {
      success['rows'].forEach(succ => {
        this.slides.push(succ.value as Slide);
      });
    }, (err) => {
      this.dataService.error(err);
    })
  }
}
