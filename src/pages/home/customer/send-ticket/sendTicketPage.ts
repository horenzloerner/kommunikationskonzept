import { Component } from "@angular/core";
import { Order } from "../../../../model/order";
import { OrderStatus } from "../../../../model/order-status";
import { ToastController } from "ionic-angular";
import { DataService } from "../../../../services/data.service";

@Component({
    templateUrl: "sendTicketPage.html"
})
export class CustomerSendTicketPage {
    constructor(public dataService: DataService, private toastCtrl: ToastController) {}
    getValidOrders(): Array<Order> {
        let validOrders: Array<Order> = new Array<Order>();
        this.dataService.getUserOrders().forEach(element => {
            if (element.status === OrderStatus.FINISHED)
                validOrders.push(element);
        });
        return validOrders;
    }
    sendTicket(order: Order) {
        this.dataService.sendOrderTicket(order);
        let toast = this.toastCtrl.create({
            message: "Ticket sent successfuly!",
            duration: 3000,
            position: "bottom"
        });
        toast.present();
    }
}