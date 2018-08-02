import { Component, OnInit, Input } from '@angular/core';
import { getLocaleFirstDayOfWeek } from '../../../node_modules/@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component'

@Component({
  selector: 'app-city-survey',
  templateUrl: './city-survey.component.html',
  styleUrls: ['./city-survey.component.css'],
  template: `
  <div>
        <h2>How well do you know {{cityName}}?</h2>
        <p>Check all that apply:</p>
        <input type="checkbox" value="5"> I live there now<br>
        <input type="checkbox" value="4"> I used to live there<br>
        <input type="checkbox" value="3"> I visit frequently<br>
        <input type="checkbox" value="2"> I've visited in the last two years<br>
        <input type="checkbox" value="1"> I visited more than two years ago<br>

        <button (click)="handleSurvey()" >Submit</button>

</div>
  `
})
export class CitySurveyComponent implements OnInit {

  @Input() dashboard: DashboardComponent;
  @Input('city') cityName: string;


  ngOnInit() {
  }

}
