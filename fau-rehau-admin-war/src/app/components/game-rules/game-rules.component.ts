import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
    templateUrl: 'game-rules.component.html',
    moduleId: module.id,
    selector: '<game-rules>'
})
export class GameRulesComponent {
    constructor(private dataService: DataService) { 
     }
    submitForm(form: NgForm) {
        let a: number = form.form.controls['product-a'].value;
        let b: number = form.form.controls['product-b'].value;
        let c: number = form.form.controls['product-c'].value;
        
        let points: number = form.form.controls['bonus-points'].value;
        let name: string = form.form.controls['quest-name'].value;

        this.dataService.addQuest(name, a, b, c, points);
    }
}