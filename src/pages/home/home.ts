import { Component } from '@angular/core';
import { ModalController } from "ionic-angular";

import { ProducerPage } from "./info-pages/producerPage";
import { CustomerPage } from "./info-pages/customerPage";

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalController: ModalController) {}
  showCustomer() {
    this.navCtrl.push(CustomerPage);
  }
  showProducer() {
    this.navCtrl.push(ProducerPage);
  }
}
