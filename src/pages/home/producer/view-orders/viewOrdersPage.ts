import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { ToastController } from "ionic-angular";
import { Order } from "../../../../model/order";
import { OrderStatus } from "../../../../model/order-status";

@Component({
    templateUrl: "viewOrdersPage.html",
})
export class ProducerViewOrdersPage {
    constructor(public dataService: DataService, private toastCtrl: ToastController) {}

    getOrders(): Array<Order> {
        return this.dataService.getUserOrders().filter(element => element.status === OrderStatus.STARTED);
    }
    setDone(order: Order) {
        this.dataService.markAsDone(order);
        let toast = this.toastCtrl.create({
            message: "Auftrag bearbeitet!",
            duration: 3000,
            position: "bottom"
        });
        toast.present();
    }
}