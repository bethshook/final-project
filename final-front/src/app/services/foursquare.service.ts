import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {

  url = "https://api.foursquare.com/v2/venues/search?"
  photoUrl = "https://api.foursquare.com/v2/venues/"

  constructor(private http:Http) { }

  //function(s) to search for locations go here
  getPlaces(city,input){
    return this.http.get(this.url +'near=' + city + '&query=' + input + '&client_id=ICBF3ADA41FDWYCLTDTHH0Q31KJ3UZWS0ZMHNDVXSZF4LYBQ&client_secret=FNIYZJGMA0OPC2JR0SQM4CIFP0JS2FNZ5RHZ1ZYLY1OHDF4X&v=20180730').toPromise()
      .then((res: Response)=>res.json())
      .then(places=>{
        return places.response.venues
      })
  }

  getPhotos(id){
    return this.http.get(this.photoUrl + id + '/photos?&client_id=ICBF3ADA41FDWYCLTDTHH0Q31KJ3UZWS0ZMHNDVXSZF4LYBQ&client_secret=FNIYZJGMA0OPC2JR0SQM4CIFP0JS2FNZ5RHZ1ZYLY1OHDF4X&v=20180730').toPromise()
    .then((res: Response)=>res.json())
    .then(photos=>{
      let prefix = photos.response.photos.items[1].prefix;
      let size = 'height100';
      let suffix = photos.response.photos.items[1].suffix;
      return prefix + size + suffix;
    })
  }


  // getObservablePlaces(): Observable<string>{
  //   return this.http.get(this.url)
  //   .pipe(map((res:Response)=>res.json()))
  // }



}
