import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Slide } from '../../model/slide';
import { DataService } from '../../services/data.service';

@Component({
    templateUrl: 'slides-setup.component.html',
    moduleId: module.id,
    selector: 'slides-setup'
})
export class SlidesSetupComponent {
    constructor(private dataService: DataService) { }
    brColor: string = '#FFFFFF';
    fontColor: string = '#000000';

    submitForm(form: NgForm) {
        let slide: Slide = new Slide();
        slide.content = form.form.controls['content'].value;
        slide.subHeadline = form.form.controls['subheadline'].value;
        slide.headline = form.form.controls['headline'].value;
        slide.uniqueId = form.form.controls['unique-id'].value;
        slide.color = this.brColor;
        slide.fontColor = this.fontColor;
        slide.isconsumer = form.form.controls['consumer-role'].value;;
        slide.isProducer = form.form.controls['producer-role'].value;
        this.dataService.addSlide(slide).subscribe((success) => {
            alert("erfolgreich");
        }, (err) => {
            alert("fehl geschlagen");
        })
    }
}