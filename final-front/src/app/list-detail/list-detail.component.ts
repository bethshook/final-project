import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
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
    img: '',
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
  list: any = {}
  listId: string = ''
  currentUser: any
  sameUser: Boolean = false
  currentListId = ''

  constructor(
    private foursquareService: FoursquareService,
    private cityService: CityService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  @Input() citySurvey: CitySurveyComponent;
  @Input('city') newCity: string;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.activeRoute.params
    .subscribe(params=>{
      console.log(params.id)
      this.id = params.id
      this.currentListId = params.id
      this.getPlaces()
    })
  }

  getPlaces = () => {
    this.cityService.getOneList(this.currentListId)
    .subscribe(list=>{
     console.log(list)
      this.list = list
      console.log(list)
      this.listId = list._id
      if (this.currentUser._id === this.list.user._id) {
        this.sameUser = true;
      }
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
        this.foursquareService.getPhotos(this.id)
        .then(imgsrc=>{
          this.imgArray.push(imgsrc)
          // if (this.imgArray.length == 0) {
          //   this.imgArray.push('http://www.richduncanconstruction.com/wp-content/uploads/2013/05/icon_square_300_knikeandfork.png', 'http://www.richduncanconstruction.com/wp-content/uploads/2013/05/icon_square_300_knikeandfork.png')
          // }
        })
      }
      this.imgArray = []
    })
    }

    // getPhotos() = () => {

    // }

    handleNewPlace(place){
      this.placeObj.name = place.name;
      this.placeObj.type = place.categories[0].name;
      this.placeObj.address = place.location.address;
      this.placeObj.lat = place.location.lat;
      this.placeObj.long = place.location.lng;
      this.foursquareService.getPhotos(place.id)
      .then(imgsrc=>{
        console.log(imgsrc)
        this.placeObj.img = imgsrc;
      })
      this.cityService.createPlace(this.placeObj, this.currentListId)
      .subscribe(r=>{
        console.log(r)
        this.list = r
      })
    }

    removeList(id){
      if(!window.confirm('Are you sure you want to delete this list?')) return
      this.cityService.deleteList(id)
      .subscribe(()=>{
        this.router.navigate(['dashboard', this.list.user._id])
      })
    }

    removePlace(placeId){
      if(!window.confirm('Are you sure you want to delete this list item?')) return
      let placeIndex = -1;
      for (let i=0; i<this.list.places.length; i++) {
        if (placeId === this.list.places[i]._id) {
          placeIndex = i;
          this.list.places.splice(placeIndex,1)
        }
      }
      this.updateList(this.list)
    }

    updateList(list){
      this.cityService.updateOneList(list)
      .subscribe(()=>{
      })
    }

    handleSave(){
      this.currentUser.savedLists.push(this.list._id)
      this.cityService.saveListToUser(this.list)
      .subscribe(()=>{
      })
    }


}
