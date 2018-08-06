import { Component, OnInit } from '@angular/core';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.css']
})
export class ListSearchComponent implements OnInit {

  user: any
  searchResults: Array<any> = []
  searchInput: string = ''

  constructor(
    private cityService: CityService;
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  search() {
    this.cityService.getByCity(this.searchInput)
    .then(lists=>{
      this.searchResults = lists;
    })
  }

}
