import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { Order } from "../../../../model/order";
import { ToastController } from "ionic-angular";

@Component({
    templateUrl: "viewOrdersPage.html"
})
export class CustomerViewOrdersPage {
    constructor(public dataService: DataService, private toastCtrl: ToastController) {}

    getOrders(): Array<Order> {
        return this.dataService.getUserOrders();
    }
}