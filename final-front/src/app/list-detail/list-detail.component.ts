import { Component, OnInit } from '@angular/core';
import { FoursquareService } from '../services/foursquare.service';
import { CityService } from '../services/city.service'

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  placeObj: any = {
    name: '',
    type: '',
    address: '',
    lat: '',
    long: ''
  }
  city: string = 'Mexico%20City'
  searchInput: string = ''
  searchResults: Array<object> = []
  imgUrl: string = ''
  imgArray: Array<string> = []
  i: number = 0;
  id: string = ''
  imgSrc: any

  constructor(
    private foursquareService: FoursquareService,
    private cityService: CityService) { }

  ngOnInit() {
  }

  search(){
    this.foursquareService.getPlaces(this.city,this.searchInput)
    .then(r=>{
      // console.log(r);
      this.searchResults = r;
      for (this.i=0; this.i<this.searchResults.length; this.i++) {
        this.id = this.searchResults[this.i].id;
        this.foursquareService.getPhotos(this.id)
        .then(imgsrc=>{
          this.imgArray.push(imgsrc)
        })
      }
      this.imgArray = []
    })
    }

    handleNewPlace(place){
      this.placeObj.name = place.name;
      this.placeObj.type = place.categories[0].name;
      this.placeObj.address = place.location.address;
      this.placeObj.lat = place.location.lat;
      this.placeObj.long = place.location.lng;
      this.foursquareService.getPhotos(place.id)
      .then(imgsrc=>{
        this.placeObj.img = imgsrc;
      })
      console.log(this.placeObj)
      this.cityService.createPlace(this.placeObj)
    }
}
