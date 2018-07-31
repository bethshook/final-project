import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { RouterModule } from "@angular/router";
import {HttpModule} from '@angular/http'

import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

//routes
import {routes} from './routes'

//services
import {AuthService} from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { PrivateComponent } from './private/private.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginComponent,
    PrivateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [
    AuthService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
