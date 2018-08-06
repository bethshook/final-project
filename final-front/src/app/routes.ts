import {Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CitySurveyComponent } from './city-survey/city-survey.component'
import { NetworkComponent } from './network/network.component'

export const routes: Routes = [
    { path: 'signup', component: SignupComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',  component: SignupComponent },
    { path: 'list-detail/:id', component: ListDetailComponent},
    { path: 'dashboard/:id', component: DashboardComponent },
    { path: 'city-survey/:id', component:CitySurveyComponent },
    { path: 'users', component: NetworkComponent }
]