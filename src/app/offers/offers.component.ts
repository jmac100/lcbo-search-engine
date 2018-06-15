import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { AppService, CacheService } from '../services';
import { Router } from "@angular/router";
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit, AfterViewInit {

  query: any;
  products: any[];
  searching: boolean = false;
  pager: any;
  defaultImage: string = 'http://placehold.it/200x300';
  offset = 100;

  constructor
  (
    private _appService: AppService, 
    private _cacheService: CacheService,
    private _router: Router,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
    let query = this._cacheService.getOfferSearch();
    if (query) {
      this.query = query;
      this.products = this._cacheService.getOfferResults();
      this.pager = this._cacheService.getOfferPager();
    }
  }

  ngAfterViewInit() {
    let returnOffer = this._cacheService.getReturnOffer();
    if (returnOffer) {
      let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#' + returnOffer);
      this.pageScrollService.start(pageScrollInstance);
    }
  }

  getOffers(){
    this.searching = true;
    this._cacheService.setOfferSearch(this.query);
    this._appService.getOffers(this.query)
      .subscribe(products => {
        this.products = products.result;
        this._cacheService.setOfferResults(this.products);
        this.pager = products.pager;
        this._cacheService.setOfferPager(this.pager);
        this.searching = false;
      });
  }

  loadMoreResults(path) {
    this.searching = true;
    this._appService.loadMoreProducts(path)
      .subscribe(products => {
        products.result.forEach(product => {
          this.products.push(product);
        });
        this._cacheService.setOfferResults(this.products);
        this.pager = products.pager;
        this._cacheService.setOfferPager(this.pager);
        this.searching = false;
      });
  }

  getProductCount(){
    return this.pager.current_page_record_count == this.pager.records_per_page
      ? this.pager.current_page_record_count * this.pager.current_page
      : this.pager.records_per_page * (this.pager.current_page - 1) + this.pager.current_page_record_count;
  }

  navigateToProductDetails(returnOffer: string) {
    this._cacheService.setReturnOffer(returnOffer);
    this._router.navigate(['/products', returnOffer]);
  }
}
