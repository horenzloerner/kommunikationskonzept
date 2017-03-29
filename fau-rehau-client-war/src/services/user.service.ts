import { Injectable } from '@angular/core';
import { Player } from '../model/player';
import { Product } from '../model/product';
import { Quest } from '../model/quest';
import { ScoreboardEntry } from '../model/scoreboardEntry';

import { DataService } from '../services/data.service';

@Injectable()
export class UserService {
    constructor() { }
    
    scoreboardEntries: Array<ScoreboardEntry> = new Array<ScoreboardEntry>();

    productQueue: Array<Product> = new Array<Product>();
    productsDone: Array<Product> = new Array<Product>();
    productsWaiting: Array<Product> = new Array<Product>();

    timeRemaining: string;

    questQueue: Array<Quest> = new Array<Quest>();
    questsDone: Array<Quest> = new Array<Quest>();

    currentPlayer: Player = new Player();
    hasEnteredGame: boolean;
    
    getTimeString(): string {
        return this.timeRemaining;
    }
    setScoreboard(scoreboardEntries: ScoreboardEntry[]) {
        scoreboardEntries.sort((a: ScoreboardEntry, b: ScoreboardEntry) => {
            if (a.score > b.score)
                return -1;
            else if (a.score < b.score)
                return 1;
            else if (a.score === b.score)
                return 0;
        })
        this.scoreboardEntries = scoreboardEntries;
    }
}