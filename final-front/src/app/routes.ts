import {Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ListsComponent } from './lists/lists.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CitySurveyComponent } from './city-survey/city-survey.component'

export const routes: Routes = [
    { path: 'signup', component: SignupComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',  component: SignupComponent },
    { path: 'lists',  component: ListsComponent },
    { path: 'list-detail/:id',
    component: ListDetailComponent,
        children:[
            // {
            //     path:'edit',
            //     component:EditListComponent
        ]},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'city-survey/:id', component:CitySurveyComponent }
]