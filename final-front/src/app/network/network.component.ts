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

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
      this.authService.getAllUsers()
    .then(users=>{
      this.users = users
    })
  }

}
