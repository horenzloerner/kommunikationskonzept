import { Component } from "@angular/core";
import { CustomerPlaceOrderPage } from "./place-order/placeOrderPage";
import { CustomerViewOrdersPage } from "./view-orders/viewOrdersPage";
import { CustomerSendTicketPage } from "./send-ticket/sendTicketPage";
import { NavController } from 'ionic-angular';
import { ProducerRootPage } from "../producer/producerRootPage";

@Component({
    templateUrl: "customerRootPage.html"
})
export class CustomerRootPage {
    tab1: any;
    tab2: any;
    tab3: any;
    icons: any;

    constructor(public navCtrl: NavController) {
        this.tab1 = CustomerPlaceOrderPage;
        this.tab2 = CustomerViewOrdersPage;
        this.tab3 = CustomerSendTicketPage;
    }
    goToProducer() {
        this.navCtrl.setRoot(ProducerRootPage);
    }
    goToCustomer() {
        this.navCtrl.setRoot(CustomerRootPage);        
    }
}