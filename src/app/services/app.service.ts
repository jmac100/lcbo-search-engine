import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class AppService {
  apiKey: string = environment.apiKey;

  constructor(private _http: Http) { }

  searchLocation(location: string) {
    let url: string = 'http://api.geonames.org/postalCodeSearchJSON?placename=' + location + '&country=CA&maxRows=10&username=jmac100';
    return this.get(url);
  }

  searchStores() {
    let selectedLocation = JSON.parse(localStorage.getItem('selected-location'));
    let url: string = 'https://lcboapi.com/stores?lat=' + selectedLocation.lat + '&lon=' + selectedLocation.lng;
    return this.get(url);
  }

  findStores(query:string) {
    let url: string = 'https://lcboapi.com/stores?per_page=10&q=' + query;
    return this.get(url);
  }

  loadMoreStores(path) {
    let url: string = 'https://lcboapi.com' + path;
    return this.get(url);
  }

  getStore(id) {
    let url: string = 'https://lcboapi.com/stores/' + id;
    return this.get(url);
  }

  getClosestStores(lat: number, long: number) { 
    let url: string = 'https://lcboapi.com/stores?per_page=5&lat=' + lat + '&lon=' + long;
    return this.get(url);
  }

  searchProducts(query: string) {
    let url: string = 'https://lcboapi.com/products?per_page=10&q=' + query.split(" ").join("+");
    return this.get(url);
  }

  loadMoreProducts(path) {
    let url: string = 'https://lcboapi.com' + path;
    return this.get(url);
  }

  getProduct(id: string){
    let url: string = 'https://lcboapi.com/products/' + id;
    return this.get(url);
  }

  searchInventory(storeId: string, query: string) {
    let url: string = 'https://lcboapi.com/products?storeId=' + storeId + '&q=' + query.split(" ").join("+");
    return this.get(url);
  }

  searchProductInventory(productId: string) {
    let url: string = 'https://lcboapi.com/inventories?product_id=' + productId;
    return this.get(url);
  }

  checkInventory(storeId: string, productId: string) {
    let url: string = 'https://lcboapi.com/stores/' + storeId + '/products/' + productId + '/inventory';
    return this.get(url);
  }

  getOffers(query: string){
    let url: string = 'https://lcboapi.com/products?where=has_limited_time_offer&per_page=10';
    if (query){
      url += '&q=' + query;
    }
    return this.get(url);
  }

  get(url){
    let headers = new Headers({ 'Authorization': this.apiKey });
    let options = new RequestOptions({ headers: headers });

    return this._http.get(url, options)
      .map(res => res.json());
  }
}
