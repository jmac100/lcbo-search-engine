import { Component, OnInit } from '@angular/core';
import { AppService, CacheService, GeolocationService } from '../services';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  stores: any[];
  selectedStore: any;
  closestStores: any[];
  query: string;
  searching: boolean = false;
  pager: any;
  coords: Coordinates;

  constructor
  (
    private _appService: AppService, 
    public _cache: CacheService,
    private geolocation: GeolocationService
  ) { }

  ngOnInit() {
    //this.getLocation();
  }  

  getLocation(): void{
    if (navigator.geolocation) {
      this.geolocation.getCurrentPosition().subscribe(
        (position: Position) => {
          this.coords = position.coords;
          this.getClosestStores();
        }
      );
    } else {
      console.log('Location services not supported');
    }
  }

  getClosestStores(){
    if (this.coords) {
      this._appService.getClosestStores(this.coords.latitude, this.coords.longitude)
        .subscribe(stores => {
          this.closestStores = stores.result;
        });
    }
  }

  findStores(){
    this.searching = true;  
    this._appService.findStores(this.query)
      .subscribe(stores => {
        this.stores = stores.result;
        this.pager = stores.pager;
        this.searching = false;
      });
  }

  loadMoreResults(path) {
    this.searching = true;
    this._appService.loadMoreStores(path)
      .subscribe(stores => {
        stores.result.forEach(store => {
          this.stores.push(store);
        });
        this.pager = stores.pager;
        this.searching = false;
      });
  }

}
