import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { QuestionData } from '../../model/question-data';

@Component({
    templateUrl: 'questions-management.component.html',
    selector: 'questions-management',
    moduleId: module.id
})
export class QuestionsManagementComponent {
    questionDataCollection: QuestionData[];
    constructor(private dataService: DataService) {
        this.dataService.getAllQuestions().subscribe((success) => {
            this.questionDataCollection = success;
        }, (error) => {
            alert("there was an error processing your request: " + error);
        });
    }
    deleteQuestion(questionData: QuestionData) {
        this.dataService.deleteQuestion(questionData).subscribe((success) => {
            alert("sucessfuly deleted");
        }, (error) => {
            alert("there was an error processing your request");
        });
    }
}