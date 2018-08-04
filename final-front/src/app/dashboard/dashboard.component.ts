import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { CityService } from '../services/city.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() signup: SignupComponent;

  newCity: String = ''
  thisCity: String = 'test'
  loadSurvey: Boolean = false
  user: any

  constructor(
    private router: Router,
    private cityService: CityService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user)
  }

handleCity(){
    console.log(this.newCity, 'button clicked in dashboard component');
    // this.loadSurvey = true; from back when this was child comp
    this.router.navigate(['city-survey/', this.user._id, this.newCity]);
  }
}
