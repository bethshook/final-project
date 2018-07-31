import {Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import {LoginComponent} from './login/login.component';
import {PrivateComponent} from './private/private.component';

export const routes: Routes = [
    { path: 'private', component: PrivateComponent},
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',  component: AppComponent },
    {
      path: 'signup',
      component: SignupFormComponent
    }
]