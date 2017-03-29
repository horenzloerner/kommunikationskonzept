import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-role-selection',
  templateUrl: 'role-selection.html'
})
export class RoleSelectionPage {

  constructor(public navCtrl: NavController, public userService: UserService) {
    
  }
  goToProducer() {
      this.userService.currentPlayer.role = "producer";
      this.navCtrl.push(HomePage);
  }
  goToCustomer(){
      this.userService.currentPlayer.role = "consumer";
      this.navCtrl.push(HomePage);
  }
}
