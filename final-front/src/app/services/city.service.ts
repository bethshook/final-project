import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url = "http://localhost:3000/"
  currentCity: String = ''

  constructor(private http: Http) { }

  addCity(city){
    this.currentCity = city;
  }

  //create place
  createPlace(place): Observable<string>{
    return this.http.post(this.url + 'list-detail', place)
    .pipe(map((res: Response)=>res.json()))
  }

  //create list
  createList(list): Observable<string>{
    return this.http.post(this.url + 'city-survey', list)
    .pipe(map((res: Response)=>res.json()))
  }

  //get list
    getOneList(id){
      console.log('service has id', id)
      return this.http.get(this.url + 'list-detail/' + id)
          .pipe(map((res: Response)=>res.json()));
  }

  //edit list
  updateOneList(list){
    return this.http.put(this.url + 'list-detail/' + list._id, list)
    .pipe(map((res: Response)=>res.json()))
  }

  //
  saveCity(city){
    this.currentCity = city;
  }

  retrieveCity(){
    return this.currentCity
  }

}
