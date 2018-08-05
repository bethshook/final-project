import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CityService } from '../services/city.service';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-city-survey',
  templateUrl: './city-survey.component.html',
  styleUrls: ['./city-survey.component.css']
})
export class CitySurveyComponent implements OnInit {

  constructor(
    private cityService: CityService,
    private authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  cityExp: any = {
    five: false,
    four: false,
    three: false,
    two: false,
    one: false
  }
  cityLevel: Number
  expId: any
  id: string = ''
  list: any
  currentCity: string = ''

  addExp(e){
    if(e.target.checked){
      this.expId = e.target.id
      this.cityExp[this.expId] = true
    }
  }

  user: any
  @Input() dashboard: DashboardComponent;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.activeRoute.params
    .subscribe(params=>{
      console.log(params.id)
      this.id = params.id
      this.cityService.getOneList(this.id)
      .subscribe(list=>{
        this.list = list
        this.currentCity = this.list.city
      })
    })
  }

  handleSurvey(){
    for (var item in this.cityExp) {
      if(this.cityExp[item] == true) {
        switch(item) {
          case 'five':
              this.cityLevel = 5;
              break;
          case 'four':
              this.cityLevel = 4;
              break;
          case 'three':
              this.cityLevel = 3;
              break;
          case 'two':
              this.cityLevel = 2;
              break;
          default:
              this.cityLevel = 1;
      }
          this.list.cityLevel = this.cityLevel;
          console.log('after ranking', this.list);
          this.updateList(this.list);
          this.router.navigate(['list-detail', this.list._id]);
      }
    }
    }

    updateList(list){
      // if(!window.confirm('Estas seguro?')) return
      this.cityService.updateListFromSurvey(list)
      .subscribe(()=>{
       console.log('list updated on component')
      })
    }

}