import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
    templateUrl: 'game-over.html',
    selector: 'game-over'
})
export class GameOverPage {
    constructor(private userService: UserService) {

    }
    reload() {
        window.location.reload();
    }
}