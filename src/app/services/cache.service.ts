import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  selectedStore: any;
  selectedLocation: any;
  favourites: any[];

  constructor() { }

  storeSelected(id){
    this.selectedStore = JSON.parse(localStorage.getItem('selected-store'));
    return this.selectedStore != null && this.selectedStore.id == id;
  }

  setStore(store: any) {
    this.selectedStore = {
      id: store.id,
      name: store.name
    };
    localStorage.setItem('selected-store', JSON.stringify(this.selectedStore));
  }

  getSelectedStore(){
    return JSON.parse(localStorage.getItem('selected-store'));
  }

  initFavourites() {
    this.favourites = JSON.parse(localStorage.getItem('favourites'));
  }

  findFavourite(productId: string): boolean {
    this.favourites = JSON.parse(localStorage.getItem('favourites'));
    if (this.favourites == null) return false;

    for (var i = 0; i < this.favourites.length; i++) {
      if (this.favourites[i].productId == productId) {
        return true;
      }
    }

    return false;
  }

  addFavourite(description: string, productId: string){
    var favourite = {
      description: description,
      productId: productId
    };
    this.favourites = JSON.parse(localStorage.getItem('favourites'));
    if (this.favourites == null){
      this.favourites = [];
    }

    this.favourites.push(favourite);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  removeFavourite(productId: string) {
    this.favourites = JSON.parse(localStorage.getItem('favourites'));
    if (this.favourites == null) return;

    for (var i = 0; i < this.favourites.length; i++) {
      if (this.favourites[i].productId == productId) {
        this.favourites.splice(i, 1);
      }
    }

    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  setProductSearch(query: string) {
    localStorage.setItem('product.search', query);
  }

  getProductSearch(): string {
    let query = localStorage.getItem('product.search');
    return  query || '';
  }

  setProductResults(products: any[]) {
    localStorage.setItem('product.results', JSON.stringify(products));
  }

  getProductResults(): any[] {
    let results = localStorage.getItem('product.results');
    if (results) {
      return JSON.parse(results);
    } else {
      return [];
    }
  }

  setReturnProduct(returnProduct: string) {
    localStorage.setItem('product.return', returnProduct);
  }

  getReturnProduct(): string {
    let returnProduct = localStorage.getItem('product.return');
    return  returnProduct || '';
  }

  setProductPager(pager: any) {
    localStorage.setItem('product.pager', JSON.stringify(pager));
  }

  getProductPager() {
    let pager = localStorage.getItem('product.pager');
    if (pager) {
      return JSON.parse(pager);
    } else {
      return null;
    }
  }

  clearProductSearch() {
    localStorage.removeItem('product.search');
    localStorage.removeItem('product.results');
    localStorage.removeItem('product.return');
    localStorage.removeItem('product.pager');
  }

  setOfferSearch(query: string) {
    localStorage.setItem('offer.search', query);
  }

  getOfferSearch(): string {
    let query = localStorage.getItem('offer.search');
    return  query || '';
  }

  setOfferResults(offers: any[]) {
    localStorage.setItem('offer.results', JSON.stringify(offers));
  }

  getOfferResults(): any[] {
    let results = localStorage.getItem('offer.results');
    if (results) {
      return JSON.parse(results);
    } else {
      return [];
    }
  }

  setReturnOffer(returnOffer: string) {
    localStorage.setItem('offer.return', returnOffer);
  }

  getReturnOffer(): string {
    let returnOffer = localStorage.getItem('offer.return');
    return  returnOffer || '';
  }

  setOfferPager(pager: any) {
    localStorage.setItem('offer.pager', JSON.stringify(pager));
  }

  getOfferPager() {
    let pager = localStorage.getItem('offer.pager');
    if (pager) {
      return JSON.parse(pager);
    } else {
      return null;
    }
  }

  clearOfferSearch() {
    localStorage.removeItem('offer.search');
    localStorage.removeItem('offer.results');
    localStorage.removeItem('offer.return');
    localStorage.removeItem('offer.pager');
  }

}
