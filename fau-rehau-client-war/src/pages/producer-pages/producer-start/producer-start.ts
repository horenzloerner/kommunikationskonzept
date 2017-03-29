import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

import { NavController, ModalController, Events } from 'ionic-angular';
import { ProducerOrderPage } from '../producer-order/producer-order';
import { ProducerMachinesPage } from '../producer-machines/producer-machines';
import { ProducerScorePage } from '../producer-score/producer-score';
import { ProducerRepairPage } from '../producer-repair/producer-repair';
import { DataService } from '../../../services/data.service';
import { Slide } from '../../../model/slide';
import { QuizPopupPage } from '../../central-pages/quiz-popup/quiz-popup';
import { GameOverPage } from '../../game-over/game-over';

@Component({
  selector: 'producer-start',
  templateUrl: 'producer-start.html'
})
export class ProducerStartPage {
  slides: Array<Slide> = new Array<Slide>();
  chargenTutorial: boolean;
  mainTutorial: boolean = true;
  producerMachinesPage = ProducerMachinesPage;
  producerOrderPage = ProducerOrderPage;
  producerScorePage = ProducerScorePage;
  producerRepairPage = ProducerRepairPage;

  constructor(public event: Events, private userService: UserService, public modalCtrl: ModalController, public navCtrl: NavController, private dataService: DataService) {
    event.subscribe('game:finished', () => {
      this.navCtrl.setRoot(GameOverPage);
    });
    this.dataService.getSlides().subscribe((success) => {
      success['rows'].forEach(succ => {
        this.slides.push(succ.value as Slide);
      });

      console.log(this.slides);
    }, (err) => {
      this.dataService.error(err);
    })
  }

  playNow() {
    this.dataService.hasGameStarted().subscribe((success) => {
      if (success === true) {
        let quizModal = this.modalCtrl.create(QuizPopupPage, { context: "pregame" });
        quizModal.onWillDismiss(value => {
          if (value === true) {
            this.dataService.resetTimer();
            this.mainTutorial = false;
            this.userService.hasEnteredGame = true;
          }
        });
        quizModal.present();
      } else {
        alert("Spiel wurde noch nicht gestartet");
      }
    })
  }

}
