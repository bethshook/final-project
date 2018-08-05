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

  listObj: any = {
    user: '',
    listName: '',
    city: '',
    cityLevel: '',
    places: []
  }

  constructor(
    private router: Router,
    private cityService: CityService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authService.getLoggedUser()
    .subscribe(user=>{
      console.log(user)
      this.user = user
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
    this.router.navigate(['signup'])
  }

}

