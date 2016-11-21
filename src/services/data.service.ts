import { Injectable } from "@angular/core";
import { Order } from "../model/order";
import { OrderStatus } from "../model/order-status";

@Injectable()
export class DataService {
    muckArray: Array<Order> = new Array<Order>();
    constructor() {
        let muckOrder1: Order = new Order();
        muckOrder1.date = new Date();
        muckOrder1.id = 9;
        muckOrder1.name = "1. Auftrag für Xx";
        let muckOrder2: Order = new Order();
        muckOrder2.date = new Date();
        muckOrder2.id = 12;
        muckOrder2.name = "2. Auftrag für Xx";
        let finishedMuckOrder1: Order = new Order();
        finishedMuckOrder1.date = new Date();
        finishedMuckOrder1.id = 16;
        finishedMuckOrder1.name = "3. Auftrag für Xx";
        finishedMuckOrder1.status = OrderStatus.FINISHED;
        this.muckArray.push(muckOrder1);
        this.muckArray.push(finishedMuckOrder1);
        this.muckArray.push(muckOrder2);
    }
    getUserOrders(): Array<Order> {
        return this.muckArray;
    }
    markAsDone(order: Order) {
        order.status = OrderStatus.FINISHED;
    }
    submitUserOrder(order: Order): boolean {
        this.muckArray.push(order);
        return true;
    }
    sendOrderTicket(order: Order) {
        order.status = OrderStatus.REPORTED;
    }
    getTickets(): Array<Order> {
        let tickets: Array<Order> = new Array<Order>();

        this.muckArray.forEach(element => {
            if (element.status === OrderStatus.REPORTED)
                tickets.push(element);
        })
        return tickets;
    }
}