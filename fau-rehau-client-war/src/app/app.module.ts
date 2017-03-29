import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NameSelectionPage } from '../pages/central-pages/name-selection/name-selection';
import { RoleSelectionPage } from '../pages/central-pages/role-selection/role-selection';
import { ProducerStartPage } from '../pages/producer-pages/producer-start/producer-start';
import { CustomerStartPage } from '../pages/customer-pages/customer-start/customer-start';
import { CustomerSubmitPage } from '../pages/customer-pages/customer-submit/customer-submit';
import { CustomerQuestsPage } from '../pages/customer-pages/customer-quests/customer-quests';
import { CustomerScorePage } from '../pages/customer-pages/customer-score/customer-score';
import { ProducerScorePage } from '../pages/producer-pages/producer-score/producer-score';
import { CustomerOrdersPage } from '../pages/customer-pages/customer-orders/customer-orders';
import { OrderDetailPage } from '../pages/customer-pages/order-detail/order-detail';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { GroupSelectionPage } from '../pages/central-pages/group-selection/group-selection';
import { ProducerOrderPage } from '../pages/producer-pages/producer-order/producer-order';
import { ProducerMachinesPage } from "../pages/producer-pages/producer-machines/producer-machines";
import { ProducerRepairPage } from '../pages/producer-pages/producer-repair/producer-repair';
import { QuizPopupPage } from './../pages/central-pages/quiz-popup/quiz-popup';
import { GameOverPage } from '../pages/central-pages/game-over/game-over';

@NgModule({
  declarations: [
    MyApp,
    NameSelectionPage,
    RoleSelectionPage,
    ProducerStartPage,
    CustomerStartPage,
    CustomerSubmitPage,
    CustomerQuestsPage,
    CustomerScorePage,
    CustomerOrdersPage,
    OrderDetailPage,
    GroupSelectionPage,
    ProducerOrderPage,
    ProducerMachinesPage,
    ProducerScorePage,
    ProducerRepairPage,
    QuizPopupPage,
    GameOverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NameSelectionPage,
    RoleSelectionPage,
    ProducerStartPage,
    CustomerStartPage,
    CustomerSubmitPage,
    CustomerQuestsPage,
    CustomerScorePage,
    CustomerOrdersPage,
    OrderDetailPage,
    GroupSelectionPage,
    ProducerOrderPage,
    ProducerMachinesPage,
    ProducerScorePage,
    ProducerRepairPage,
    QuizPopupPage,
    GameOverPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DataService, UserService]
})
export class AppModule {}
