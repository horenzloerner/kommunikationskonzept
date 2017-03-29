import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { RoleSelectionPage } from '../role-selection/role-selection';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';

import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

import { Player } from '../../model/player';

@Component({
  selector: 'group-selection',
  templateUrl: 'group-selection.html'
})
export class GroupSelectionPage {
inputName: string;
groupName: string;
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public userService: UserService, public dataService: DataService) {}
  scanGroupCode() {
        this.dataService.registerGroup("test").subscribe((id) => {
            this.userService.currentPlayer.groupId = id;
            this.navCtrl.push(RoleSelectionPage);
        }, (err) => { 
          this.dataService.error(err); 
        });
    }
}
