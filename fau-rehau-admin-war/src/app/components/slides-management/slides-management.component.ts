import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SlideData } from '../../model/slide-data';

@Component({
    templateUrl: 'slides-management.component.html',
    selector: 'slides-management',
    moduleId: module.id
})
export class SlidesManagementComponent {
    slideDataCollection: SlideData[];
    constructor(private dataService: DataService) {
        this.dataService.getAllSlides().subscribe((success) => {
            this.slideDataCollection = success;
        }, (error) => {
            alert("there was an error processing your request: " + error);
        });
    }
}