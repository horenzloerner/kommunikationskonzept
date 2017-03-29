import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ProducerStartPage } from '../producer-pages/producer-start/producer-start';
import { CustomerStartPage } from '../customer-pages/customer-start/customer-start';

import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';

import { Player } from '../../model/player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
inputName: string;

  constructor(public navCtrl: NavController, public userService: UserService, public dataService: DataService) {
  }
  createUser(){
    this.dataService.registerPlayer(this.inputName).subscribe((success) => {
      this.userService.currentPlayer.name = this.inputName;

      this.userService.currentPlayer.playerId = success;
      if (this.userService.currentPlayer.role === "producer") {
        this.navCtrl.setRoot(ProducerStartPage);
      } else if(this.userService.currentPlayer.role === "consumer") {
        this.navCtrl.setRoot(CustomerStartPage);
      }
    }, (error) => {
      this.dataService.error(error);
    });
  }
}
