import { Injectable } from "@angular/core"
import { Http, Headers, RequestOptions, RequestMethod } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Question } from '../model/question';
import { QuestionData } from '../model/question-data';
import { SlideData } from '../model/slide-data';

import { config } from '../config/config';
import { Slide } from '../model/slide';

import "rxjs/add/operator/map";

@Injectable()
export class DataService {

    constructor(private http: Http) { }

    addQuest(name: string, productA: number, productB: number, productC: number, bonusPoints: number): Observable<any> {
        return this.http.get(config.REST_URL + "add-quest/" + name + "/" + productA + "/" + productB + "/" + productC + "/" + bonusPoints).map((success) => success.json());
    }

    getAllQuestions(): Observable<QuestionData[]> {
        return this.http.get(config.DATABASE_URL + 'questions/_all_docs?startkey="question-"&include_docs=true')
            .map((success) => {
                let questionDataArray: QuestionData[] = new Array<QuestionData>();

                success.json()['rows'].forEach((elem) => {
                    let questionData: QuestionData = new QuestionData();
                    questionData = elem;
                    questionData.ref = elem.value.rev;
                    questionDataArray.push(questionData);
                });
                return questionDataArray;
            });
    }

    getAllSlides(): Observable<SlideData[]> {
        return this.http.get(config.DATABASE_URL + 'slides/_all_docs?startkey="slide-"&include_docs=true')
            .map((success) => {
                let slideDataArray: SlideData[] = new Array<SlideData>();

                success.json()['rows'].forEach((elem) => {
                    let slideData: SlideData = new SlideData();
                    slideData = elem;
                    slideData.ref = elem.value.rev;
                    slideDataArray.push(slideData);
                });
                return slideDataArray;
            });
    }
    startGame(time: number): Observable<any> {
        return this.http.get(config.REST_URL + 'start-game');
    }
    stopGame(): Observable<any> {
        return this.http.get(config.REST_URL + 'stop-game');
    }
    addQuestion(question: Question): Observable<any> {
        return this.http.put(config.DATABASE_URL + "questions/question-" + question.uniqueId, question).map((success) => success.json());
    }

    deleteQuestion(docToDelete: QuestionData): Observable<any> {
        let options: RequestOptions = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.delete(config.DATABASE_URL + "questions/" + docToDelete.id + "?rev=" + docToDelete.ref, options).map((result) => result.json());
    }
    createDatabase(name: string): Observable<any> {
        return this.http.put(config.DATABASE_URL + name, {}).map((result) => result.json())
    }
    addSlide(slide: Slide): Observable<any> {
        return this.http.put(config.DATABASE_URL + "slides/slide-" + slide.uniqueId, slide).map((success) => success.json());
    }
    changeDataBase(any: any): Observable<any> {
        return null;
    }
}