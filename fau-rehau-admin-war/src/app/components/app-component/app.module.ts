import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, Form } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from '../app-component/app.component';
import { DataService } from '../../services/data.service';
import { RouterModule, Routes } from '@angular/router';

import { SlidesManagementComponent } from './../slides-management/slides-management.component';
import { QuestionsManagementComponent } from './../questions-management/questions-management.component';

import { GameRulesComponent } from '../game-rules/game-rules.component';
import { DatabaseSetupComponent } from '../database-setup/database-setup.component';
import { QuestionsSetupComponent } from '../questions-setup/questions-setup.component';
import { SlidesSetupComponent } from '../slides-setup/slides-setup.component';
import { PlayNowComponent } from '../play-now/play-now.component';

const appRoutes: Routes = [
  { 
    path: '', 
    redirectTo: 'play-now', pathMatch: 'full'
  },
  {
    path: 'play-now',
    component: PlayNowComponent
  },
  {
    path: 'game-rules',
    component: GameRulesComponent
  },
  { 
    path: 'database-setup',      
    component: DatabaseSetupComponent 
  },
  {
    path: 'questions-setup',
    component: QuestionsSetupComponent,
  },
  {
    path: 'questions-management',
    component: QuestionsManagementComponent,
  },
  {
    path: 'slides-management',
    component: SlidesManagementComponent
  },
  { 
    path: 'slides-setup', 
    component: SlidesSetupComponent 
  }
];


@NgModule({
  declarations: [
    AppComponent,
    GameRulesComponent,
    DatabaseSetupComponent,
    QuestionsSetupComponent,
    SlidesSetupComponent,
    PlayNowComponent,
    QuestionsManagementComponent,
    SlidesManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
