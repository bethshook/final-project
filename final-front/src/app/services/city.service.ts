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
  createPlace(place, listId): Observable<string>{
    return this.http.post(this.url + `list-detail/${listId}`, place)
    .pipe(map((res: Response)=>res.json()))
  }

  //create list
  createList(list): Observable<string>{
    return this.http.post(this.url + 'dashboard', list)
    .pipe(map((res: Response)=>res.json()))
  }

  //get list
    getOneList(id){
      return this.http.get(this.url + 'list-detail/' + id)
          .pipe(map((res: Response)=>res.json()));
  }

  //edit list
  updateOneList(list){
    return this.http.put(this.url + 'list-detail/' + list._id, list)
    .pipe(map((res: Response)=>res.json()))
  }

  //edit list from survey
  updateListFromSurvey(list){
    return this.http.put(this.url + 'city-survey/' + list._id, list)
    .pipe(map((res: Response)=>res.json()))
  }

 // post searched city to get all matching lists
  getByCity(city){
  return this.http.post(this.url + 'list-search', city).toPromise()
  .then((res: Response)=> res.json())
    .catch(e=>console.log(e))
}

  // save list to a user
  saveListToUser(list){
    // return this.http.put(this.url + 'list-detail/' + list._id + '/save')
    // .pipe(map((res: Response)=>res.json()))
  }

  // delete list
  deleteList(id){
    return this.http.delete(this.url + 'list-detail/' + id)
    .pipe(map((res:Response)=>res.json()))
  }


  //delete place
  //need to be sure I'm deleting PLACEID and not LISTID
  // deletePlace(placeId, list){
  //   return this.http.delete(this.url + 'delete-place' + placeId, list)
  //   .pipe(map((res: Response)=>res.json()))
  // }

}
