import { Component } from "@angular/core";
import { NavController } from 'ionic-angular';
import { ProducerRootPage } from "../producer/producerRootPage";

@Component({
    templateUrl: "producerPage.html"
})
export class ProducerPage {
    constructor(public navController: NavController) {

    }
    setRoot() {
        this.navController.setRoot(ProducerRootPage);
    }
}