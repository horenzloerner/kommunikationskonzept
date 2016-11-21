import { Component } from "@angular/core";
import { ProducerViewStatusPage } from "./view-status/viewStatusPage";
import { ProducerViewOrdersPage } from "./view-orders/viewOrdersPage";
import { ProducerViewTicketsPage } from "./view-tickets/viewTicketsPage";
import { NavController } from 'ionic-angular';
import { CustomerRootPage } from "../customer/customerRootPage";

@Component({
    templateUrl: "producerRootPage.html"
})
export class ProducerRootPage {
    tab1: any;
    tab2: any;
    tab3: any;

    constructor(public navCtrl: NavController) {
        this.tab1 = ProducerViewOrdersPage;
        this.tab2 = ProducerViewStatusPage;
        this.tab3 = ProducerViewTicketsPage;
    }
    goToProducer() {
        this.navCtrl.setRoot(ProducerRootPage);
    }
    goToCustomer() {
        this.navCtrl.setRoot(CustomerRootPage);        
    }
}