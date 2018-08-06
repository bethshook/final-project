import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


const config = {
  apiKey: "AIzaSyDXktW6Ge_3YNPYPIyZykIW6uwQqUt8eRE",
  authDomain: "vocallocal-213ca.firebaseapp.com",
  databaseURL: "https://vocallocal-213ca.firebaseio.com",
  projectId: "vocallocal-213ca",
  storageBucket: "vocallocal-213ca.appspot.com",
  messagingSenderId: "369031820106"
};
firebase.initializeApp(config);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private router: Router) { }
  provider = new firebase.auth.FacebookAuthProvider();

  url = 'http://localhost:3000/'

  loginWithFacebook(){
    firebase.auth().signInWithPopup(this.provider)
    .then(snap=>{
      localStorage.setItem('facebookToken', JSON.stringify(snap.credential.accessToken))
      localStorage.setItem('user', JSON.stringify(snap.user));
      this._sendTokenToBackend(snap)
    })
  }

  _sendTokenToBackend(snap){
    const token = snap.credential.accessToken;
    fetch(this.url + 'facebook/login', {
      method: 'post',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    .then(r=>{
      if(!r.ok) throw new Error()
      return r.json()
    })
    .then(res=>{
      console.log(res);
      this.router.navigate(['dashboard', res._id]);
    })
  }

}
