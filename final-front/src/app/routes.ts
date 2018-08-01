import {Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: 'signup', component: SignupComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',  component: AppComponent },
]