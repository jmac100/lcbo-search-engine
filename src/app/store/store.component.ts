import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, CacheService } from '../services';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  store: any;
  inventory: string;
  products: any[];
  searching: boolean = false;
  pager: any;
  defaultImage: string = 'http://placehold.it/200x300';
  offset = 100;

  constructor
  (
    private _route: ActivatedRoute,
    private _router: Router,
    private _appService: AppService,
    public _cacheService: CacheService
  ) { }

  ngOnInit() {
    this.getStore();
  }

  getStore() {
    this._route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this._appService.getStore(id)
          .subscribe(store => {
            this.store = store.result;
        });
      });
  }

  searchInventory(){
    this.searching = true;
    this._appService.searchInventory(this.store.id, this.inventory)
      .subscribe(products => {
        this.products = products.result;
        this.searching = false;
      });
  }

  formatMapUrl(): string {
    let address = encodeURI(this.store.address_line_1 + ' ' + this.store.address_line_2 + ' ' + this.store.city + ' ' +
    this.store.postal_code);
    return 'https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=' + address;
  }

  addFavourite(description: string, productId: string) {
    this._cacheService.addFavourite(description, productId);
  }
}
