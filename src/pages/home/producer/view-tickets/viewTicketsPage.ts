import { Component } from "@angular/core";
import { DataService } from "../../../../services/data.service";
import { ToastController } from "ionic-angular";
import { Order } from "../../../../model/order";
import { OrderStatus } from "../../../../model/order-status";

@Component({
    templateUrl: "viewTicketsPage.html",
})
export class ProducerViewTicketsPage {
    constructor(public dataService: DataService, public toastCtrl: ToastController){}

    getTickets(): Array<Order> {
        return this.dataService.getTickets();
    }
    setDone(order: Order) {
        let toast = this.toastCtrl.create({
            message: "Ticket set to finished!",
            duration: 3000,
            position: "bottom"
        });
        toast.present();
        this.dataService.markAsDone(order);
    }
}