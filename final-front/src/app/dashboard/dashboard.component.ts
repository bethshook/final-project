import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitySurveyComponent } from '../city-survey/city-survey.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  newCity: String = ''
  city: String = ''
  loadSurvey: Boolean = false

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

handleCity(){
    this.city = this.city
    console.log(this.city)
    this.loadSurvey = true
  }
}
