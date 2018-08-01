import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {

  email: string = ''
  password: string = ''
  auth: any = {
    email: '',
    password: ''
  } //object used for all authentication
  user = ''

  constructor(private authService: AuthService) { }

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

}
