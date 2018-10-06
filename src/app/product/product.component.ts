import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, CacheService } from '../services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: any;
  inventory: any;
  searchResults: any[];
  defaultImage: string = 'http://placehold.it/200x100';
  offset = 100;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _appService: AppService,
    public _cacheService: CacheService
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this._route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this._appService.getProduct(id)
          .subscribe(product => {
          this.product = product.result;
          this.checkInventory();
        });
      });
  }

  checkInventory() {
    let selectedStore = this._cacheService.getSelectedStore();
    if (!selectedStore) return;
    this._appService.checkInventory(selectedStore.id, this.product.id)
      .subscribe(inventory => {
        this.inventory = inventory.result;
      });
  }

  addFavourite(description: string, productId: string) {
    this._cacheService.addFavourite(description, productId);
  }
}
