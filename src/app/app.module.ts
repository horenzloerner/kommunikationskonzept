import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CustomerPage } from "../pages/home/info-pages/customerPage";
import { ProducerPage } from "../pages/home/info-pages/producerPage";
import { ProducerRootPage } from "../pages/home/producer/producerRootPage";

import { CustomerRootPage } from "../pages/home/customer/customerRootPage";

import { CustomerPlaceOrderPage } from "../pages/home/customer/place-order/placeOrderPage";
import { CustomerViewOrdersPage } from "../pages/home/customer/view-orders/viewOrdersPage";
import { CustomerSendTicketPage } from "../pages/home/customer/send-ticket/sendTicketPage";

import { ProducerViewStatusPage } from "../pages/home/producer/view-status/viewStatusPage";
import { ProducerViewOrdersPage } from "../pages/home/producer/view-orders/viewOrdersPage";
import { ProducerViewTicketsPage } from "../pages/home/producer/view-tickets/viewTicketsPage";


import { DataService } from "../services/data.service";
import { NativeService } from "../services/native.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProducerPage,
    CustomerPlaceOrderPage,
    CustomerViewOrdersPage,
    CustomerSendTicketPage,
    ProducerViewStatusPage,
    ProducerViewOrdersPage,
    ProducerViewTicketsPage,
    CustomerPage,
    ProducerRootPage,
    CustomerRootPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProducerPage,
    CustomerPage,
    ProducerRootPage,
    CustomerPlaceOrderPage,
    CustomerViewOrdersPage,
    CustomerSendTicketPage,
    ProducerViewStatusPage,
    ProducerViewOrdersPage,
    ProducerViewTicketsPage,
    CustomerRootPage
  ],
  providers: [
    DataService,
    NativeService
  ]
})
export class AppModule {}
