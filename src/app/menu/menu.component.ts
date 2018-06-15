import { Component, OnInit } from '@angular/core';
import { AppService, CacheService } from '../services';
import { Router } from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title: string = 'LCBO Search Engine'
  locations: any[];
  location: string;
  store: any;
  storeDetails: any;
  dayOfWeek: number;
  openHour: any;
  closeHour: any;

  constructor
  (
    private _appService: AppService, 
    public _cache: CacheService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._cache.initFavourites();
    this.loadCurrentStoreDetails();
  }

  loadCurrentStoreDetails() {
    this.storeDetails = this._cache.getSelectedStore();
    if (this.storeDetails) {
      this._appService.getStore(this.storeDetails.id)
        .subscribe(data => {
          this.store = data.result;       
          this.IsOpen();   
        });
    }
  }

  public IsOpen(){
    let dayOfWeek = moment().day();
    switch (dayOfWeek) {
      case 0: {
        this.openHour = this.convertTime(this.store.sunday_open);
        this.closeHour = this.convertTime(this.store.sunday_close);
        break;
      }
      case 1: {
        this.openHour = this.convertTime(this.store.monday_open);
        this.closeHour = this.convertTime(this.store.monday_close);
        break;
      }
      case 2: {
        this.openHour = this.convertTime(this.store.tuesday_open);
        this.closeHour = this.convertTime(this.store.tuesday_close);
        break;
      }
      case 3: {
        this.openHour = this.convertTime(this.store.wednesday_open);
        this.closeHour = this.convertTime(this.store.wednesday_close);
        break;
      }
      case 4: {
        this.openHour = this.convertTime(this.store.thursday_open);
        this.closeHour = this.convertTime(this.store.thursday_close);
        break;
      }
      case 5: {
        this.openHour = this.convertTime(this.store.friday_open);
        this.closeHour = this.convertTime(this.store.friday_close);
        break;
      }
      case 6: {
        this.openHour = this.convertTime(this.store.saturday_open);
        this.closeHour = this.convertTime(this.store.saturday_close);
        break;
      }      
    }

    let currentHour = moment().hour();
    return currentHour >= this.openHour && currentHour < this.closeHour;
  }

  convertTime(minutesSinceMidnight) {
    var time = ("00" + (minutesSinceMidnight % 60)).slice(-2);
    var h24  = Math.floor(minutesSinceMidnight / 60);
    return h24;
  }

  searchLocation(){
    this._appService.searchLocation(this.location)
      .subscribe(locations => {
        this.locations = locations.postalCodes;
      });
  }

  clearProductSearch() {
    this._cache.clearProductSearch();
    this._router.navigate(['/products']);
  }

  clearOfferSearch() {
    this._cache.clearOfferSearch();
    this._router.navigate(['/offers']);
  }
}
