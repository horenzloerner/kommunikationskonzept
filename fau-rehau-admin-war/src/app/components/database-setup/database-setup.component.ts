import { Component } from '@angular/core';
import { NgForm }from '@angular/forms';
import { DataService } from './../../services/data.service';
import { config } from '../../config/config';

@Component({
    templateUrl: 'database-setup.component.html',
    moduleId: module.id,
    selector: 'database-setup'
})
export class DatabaseSetupComponent {
    constructor(private dataService: DataService) { }

    submitForm(ngForm: NgForm) {
        this.dataService.changeDataBase(ngForm.form.controls['db-url'].value);
    }
    initQuestions() {
        this.dataService.createDatabase("questions").subscribe((success) => {
            alert("database succesfuly created");
        }, (error) => {
            alert("there was an error creating the database");
        })
    }
    initSlides() {
        this.dataService.createDatabase("slides").subscribe((success) => {
            alert("database successfuly created");
        }, (error) => {
            alert("there was an error creating the database");
        })
    }

    setRESTUrl(url: string) {
        config.REST_URL = url;
    }

    setDatabase(url: string) {
        config.DATABASE_URL = url;
    }
}