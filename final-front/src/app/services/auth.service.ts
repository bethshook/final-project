import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:3000/"
  constructor(private http: Http){}

  signup(auth): Observable<string>{
    return this.http.post(this.url + 'signup', auth)
    .pipe(map((res: Response)=>res.json()))
  }

  login(auth): Observable<string>{
    return this.http.post(this.url + 'login', auth, {withCredentials:true})
    .pipe(map(res=>res.json()))
  }

  getLoggedUser(){
    return this.http.get(this.url + 'loggedUser', {withCredentials:true})
    .pipe(map(res=>{
      return res.json()
    }))
  }

  logout(){
    localStorage.removeItem('user')
  }

  updateUser(user) {
    return this.http.put(this.url + 'dashboard/' + user._id, user)
    .pipe(map((res: Response)=>res.json()))
  }

// add user to other user's friends array
  addFriend(user) {
    return this.http.put(this.url + 'users/' + user._id, user)
    .pipe(map((res: Response)=>res.json()))
  }

  //get one user
  getUser(id){
    return this.http.get(this.url + 'profileUser/' + id)
    .pipe(map((res: Response)=>res.json()))
  }

  //get all users
  getAllUsers(user){
    return this.http.get(this.url + 'users/' + user._id).toPromise()
    .then((res: Response)=> res.json())
    .catch(e=>console.log(e))
}

}