import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
    templateUrl: 'play-now.component.html',
    selector: 'play-now',
    moduleId: module.id
})
export class PlayNowComponent {
    gameTime: number = 10;

    constructor(private dataService: DataService) {

    }

    startGame() {
        this.dataService.startGame(this.gameTime).subscribe((success) => {
            alert("Success!")
        }, (error) => {
            alert("There was an Error: " + error)
        });
    }

    stopGame() {
        this.dataService.stopGame().subscribe((success) => {
            alert("Game Stopped!")
        }, (error) => {
            alert("There was an Error: " + error)
        });
    }
}