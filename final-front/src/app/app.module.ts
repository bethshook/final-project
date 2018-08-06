import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

//services
import {AuthService} from './services/auth.service';
import {CityService} from './services/city.service'

//routes
import {routes} from './routes';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CitySurveyComponent } from './city-survey/city-survey.component';
import { NetworkComponent } from './network/network.component'

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ListDetailComponent,
    DashboardComponent,
    CitySurveyComponent,
    NetworkComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
