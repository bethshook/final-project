import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import {FirebaseService} from '../services/firebase.service'

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
  username: string = ''
  auth: any = {
    username: '',
    email: '',
    password: '',
    lists: [],
    friends: [],
    savedLists: []
  } //object used for all authentication
  user: any

  constructor(
    private authService: AuthService,
    private router: Router,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    //if user is from local storage navigate
    // const user = JSON.parse(localStorage.getItem('user'))
  }

  loginWithFacebook(){
    this.firebaseService.loginWithFacebook()
  }

  handleSignup(){
    this.auth.username = this.username;
    this.auth.email = this.email;
    this.auth.password = this.password;
    this.authService.signup(this.auth)
    .subscribe( user => this.user = user)
    this.username = '';
    this.email = '';
    this.password = '';
    this.hasAccount = true;
  }

  handleLogin(){
    //cut the withCredentials from this function to avoid error
    this.authService.login(this.auth)
    .subscribe(user=>{
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['dashboard', this.user._id]);
    })
  }

}
