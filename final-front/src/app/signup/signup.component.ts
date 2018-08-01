import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {

  hasAccount: boolean = true
  email: string = ''
  password: string = ''
  auth: any = {
    email: '',
    password: ''
  } //object used for all authentication
  user = ''

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  handleSignup(){
    this.auth.email = this.email;
    this.auth.password = this.password;
    this.authService.signup(this.auth)
    .subscribe( user => this.user = user)
    console.log(this.user)
    this.email = '';
    this.password = '';
  }

  handleLogin(){
    //cut the withCredentials from this function to avoid error
    this.authService.login(this.auth)
    .subscribe(user=>{
      this.user = user
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['dashboard']);
      //how to pass user here
    })
  }

}
