import { Component } from "@angular/core";
import { Order } from "../../../../model/order";
import { DataService } from "../../../../services/data.service";
import { NativeService } from "../../../../services/native.service";

import { ToastController } from "ionic-angular";

@Component({
    templateUrl: "placeOrderPage.html"
})
export class CustomerPlaceOrderPage {
    orderDesc: string;
    orderName: string;
    orderId: number;
    errorMessage: string;

    constructor(public dataService: DataService, private toastCtrl: ToastController, public nativeService: NativeService) {}
    scanBarCode() {
        this.nativeService.scanCode();
    }
    submitForm() {
        let newOrder: Order = new Order();
        newOrder.id = this.orderId;
        newOrder.name = this.orderName;
        newOrder.desc = this.orderDesc;

        if(!this.dataService.submitUserOrder(newOrder))
            this.errorMessage = "there was an error processing your order";

        let toast = this.toastCtrl.create({
            message: "Order placed successfuly!",
            duration: 3000,
            position: "bottom"
        });
        toast.present();
    }
}