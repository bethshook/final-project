import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { CityService } from '../services/city.service';
import { AuthService } from '../services/auth.service'

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
  listId: string = ''
  userId: string = ''
  profUserId: string = ''
  profUser: any
  sameUser: Boolean = false
  fbUser: any

  listObj: any = {
    user: '',
    listName: '',
    city: '',
    cityLevel: Number,
    places: []
  }

  constructor(
    private router: Router,
    private cityService: CityService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params
    .subscribe(params=>{
      this.profUserId = params.id;
    })
    this.authService.getUser(this.profUserId)
    .subscribe(user=>{
      this.profUser = user;
    })
    this.authService.getLoggedUser()
    .subscribe(user=>{
      this.user = user;
      this.userId = user._id;
      if (this.userId === this.profUserId) {
        this.sameUser = true;
      }
      })
    }

handleCity(){
    this.listObj.listName = this.user.username + '\'s ' + this.newCity + ' Recommendations';
    this.listObj.user = this.user;
    this.listObj.city = this.newCity;
    this.cityService.createList(this.listObj)
      .subscribe(l=>{
        let id = l._id;
        this.listId = id;
        this.user.lists.push(this.listId);
        this.updateUser(this.user);
  })
}

  updateUser(user){
    this.authService.updateUser(this.user)
    .subscribe(()=>{
      this.router.navigate(['city-survey', this.listId]);
    })
  }

  handleLogout(){
    this.authService.logout()
    // this.authService.newLogout()
    this.router.navigate(['signup'])
  }

}

