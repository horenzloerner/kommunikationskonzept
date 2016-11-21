import { OrderStatus } from "./order-status";

export class Order {
    date: Date;
    name: string;
    id: number;
    desc: string;
    status: OrderStatus;

    constructor() {
        this.status = OrderStatus.STARTED;
    }
    getStatus(): string {
        if (this.status === OrderStatus.STARTED)
            return "Auftrag abgegeben";
        else if (this.status === OrderStatus.WAITING)
            return "Auftrag wartend";
        else if (this.status === OrderStatus.FINISHED)
            return "Auftrag abgeschlossen";
        else if (this.status === OrderStatus.REPORTED)
            return "Auftrag beschwerde";
        else
            return "invalid parameters";
    }
}