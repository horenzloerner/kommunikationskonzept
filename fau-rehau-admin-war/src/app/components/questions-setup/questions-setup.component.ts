import { Component } from '@angular/core';
import { Option } from '../../model/option';
import { NgForm } from '@angular/forms';
import { Question } from '../../model/question';
import { DataService }from '../../services/data.service';
import { ShowOn} from '../../model/showon';

@Component({
    templateUrl: 'questions-setup.component.html',
    selector: '<questions-setup>',
    moduleId: module.id
})
export class QuestionsSetupComponent {
    constructor(private dataService: DataService) { }
    
    currentOptions: Array<Option> = new Array<Option>();

    onAddOption(value: NgForm) {
        let option: Option = new Option();
        option.description = value.form.controls['description'].value;
        option.label = value.form.controls['label'].value;
        option.rank = this.currentOptions.length+1;
        option.isRightAnswer = value.form.controls['is-right-answer'].value;
        value.reset();
        this.currentOptions.push(option);
    }
    submitForm(value: NgForm) {
        let question: Question = new Question();
        question.options = this.currentOptions;
        question.description = value.form.controls['question-description'].value;
        question.label = value.form.controls['question-label'].value;
        question.uniqueId = value.form.controls['question-id'].value;

        question.shownOn.push(new ShowOn("producer-pregame", value.form.controls['producer-pregame'].value));
        question.shownOn.push(new ShowOn("producer-approve-order", value.form.controls['producer-approve-order'].value));
        question.shownOn.push(new ShowOn("producer-set-machine", value.form.controls['producer-set-machine'].value));
        question.shownOn.push(new ShowOn("producer-repair", value.form.controls['producer-repair'].value));

        question.shownOn.push(new ShowOn("consumer-pregame", value.form.controls['consumer-pregame'].value));
        question.shownOn.push(new ShowOn("consumer-submit-order", value.form.controls['consumer-submit-order'].value));
        question.shownOn.push(new ShowOn("consumer-cancel-order", value.form.controls['consumer-cancel-order'].value));
        question.shownOn.push(new ShowOn("consumer-complete-quest", value.form.controls['consumer-complete-quest'].value));

        this.dataService.addQuestion(question).subscribe((succ) => {
            alert("erfolg");
        }, (err) => {
            alert("error");
        });
    }
}