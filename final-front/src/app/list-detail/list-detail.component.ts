import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoursquareService } from '../services/foursquare.service';
import { CityService } from '../services/city.service';
import { CitySurveyComponent } from '../city-survey/city-survey.component'

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

  placeId: any
  searchInput: string = ''
  searchResults: any
  imgUrl: string = ''
  imgArray: Array<string> = []
  i: number = 0;
  id: string = ''
  imgSrc: any
  list: any

  constructor(
    private foursquareService: FoursquareService,
    private cityService: CityService,
    private activeRoute: ActivatedRoute
  ) { }

  @Input() citySurvey: CitySurveyComponent;
  @Input('city') newCity: string;

  ngOnInit() {
    this.activeRoute.params
    .subscribe(params=>{
      console.log(params.id)
      this.id = params.id
      this.cityService.getOneList(this.id)
      .subscribe(list=>{
       console.log(list)
        this.list = list
      })
    })
  }

  search(){
    this.foursquareService.getPlaces(this.list.city,this.searchInput)
    .then(r=>{
      this.searchResults = r;
      for (this.i=0; this.i<this.searchResults.length; this.i++) {
        console.log(this.searchResults[this.i])
        this.id = this.searchResults[this.i].id;
        // having some trouble with this API photo request
        // this.foursquareService.getPhotos(this.id)
        // .then(imgsrc=>{
        //   this.imgArray.push(imgsrc)
        // })
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
      this.cityService.createPlace(this.placeObj)
      .subscribe(r=>{
        this.placeId = r._id;
        console.log(this.placeId)
        this.list.places.push(this.placeId);
        console.log(this.list.places) // this works, array is full
        this.updateList(this.list)
      })
    }

    removePlace(id){
      // this.cityService.deletePlace(id, this.id)
    }


    updateList(list){
      // if(!window.confirm('Estas seguro?')) return
      this.cityService.updateOneList(list)
      .subscribe(()=>{
       console.log('list updated on component')
      })
    }


}
