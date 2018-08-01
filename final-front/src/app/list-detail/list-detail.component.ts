import { Component, OnInit } from '@angular/core';
import { Capability } from '../../../node_modules/protractor';
import { FoursquareService } from '../services/foursquare.service'

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  city: string = 'Miami'
  searchInput: string = ''
  searchResults: Array<object> = []

  constructor(private foursquareService: FoursquareService) { }

  ngOnInit() {
  }

  search(){
    this.foursquareService.getPlaces(this.city,this.searchInput);
    this.searchResults = this.foursquareService.places;
    console.log(this.searchResults)
  }

}
