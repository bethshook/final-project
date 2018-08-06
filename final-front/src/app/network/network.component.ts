import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  users: Array<any>
  user: any

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
      this.authService.getAllUsers(this.user)
    .then(users=>{
      this.users = users
    })
  }

  handleNewFriend(otherUser){
    if (otherUser._id === this.user._id) {
      alert('You can\'t connect with yourself!')
    } else {
      console.log(otherUser)
      this.user.friends.push(otherUser._id);
      this.authService.addFriend(this.user)
      .subscribe(()=>{
      })
    }
  }

}
