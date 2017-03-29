import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dataService: DataService) {
  }
  submitQuest() {
    this.dataService.addQuest(this.questName, this.producta, this.productb, this.productc, this.bonusPoints)
          .subscribe((success) => {
            alert("Quest erfolgreich hinzugefügt")
          }, (err) => {
          });
  }
  title = 'Admin Interface';
  producta: number;
  productb: number;
  productc: number;
  bonusPoints: number;
  questName: string;
}
