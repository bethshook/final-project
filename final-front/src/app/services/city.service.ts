import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url = "http://localhost:3000/list-detail"
  currentCity: String = ''

  constructor(private http: Http) { }

  addCity(city){
    this.currentCity = city;
  }

  //create one place
  createPlace(place): Observable<string>{
    return this.http.post(this.url, place)
    .pipe(map((res: Response)=>res.json()))
  }
}
