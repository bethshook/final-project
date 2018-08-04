import { Component, OnInit, Input } from '@angular/core';
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
    private router: Router) { }

  cityExp: any = {
    five: false,
    four: false,
    three: false,
    two: false,
    one: false
  }
  cityLevel: any
  expId: any

  listObj: any = {
    user: '',
    listName: '',
    city: '',
    cityLevel: '',
    places: []
  }

  listName: string = ''
  listId: string = ''

  addExp(e){
    if(e.target.checked){
      this.expId = e.target.id
      this.cityExp[this.expId] = true
    }
  }

  user: any
  @Input() dashboard: DashboardComponent;
  // @Input('city') newCity: string;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
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
      this.listObj.listName = this.user.email + '\'s ' + this.newCity + ' Recommendations';
      this.listName = this.listObj.listName;
      this.listObj.user = this.user;
      this.listObj.city = this.newCity;
      this.listObj.cityLevel = this.cityLevel;
      this.cityService.createList(this.listObj)
        .subscribe(r=>{
          let id = r._id;
          this.listId = id;
          this.user.lists.push(this.listId);
          this.updateUser(this.user)
          this.router.navigate(['list-detail', r._id]);
        })
      }
    }
    }

    updateUser(user){
      this.authService.updateUser(user)
      .subscribe(()=>{
       console.log('user updated on component')
      })
    }



}