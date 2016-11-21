import { Component } from "@angular/core";
import { NavController } from 'ionic-angular';
import { CustomerRootPage } from "../customer/customerRootPage";

@Component({
    templateUrl: "customerPage.html"
})
export class CustomerPage {
    constructor(public navController: NavController) {}

    setRoot() {
        this.navController.setRoot(CustomerRootPage);
    }
}