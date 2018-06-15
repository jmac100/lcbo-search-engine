import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { AppService, CacheService } from '../services';
import { Router } from "@angular/router";
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  query: string;
  products: any[];
  searching: boolean = false;
  pager: any;
  defaultImage: string = 'http://placehold.it/200x300';
  offset = 100;

  constructor
  (
    private _appService: AppService, 
    private _cache: CacheService,
    private _router: Router,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) { }

  ngOnInit() {
    let query = this._cache.getProductSearch();
    if (query) {
      this.query = query;
      this.products = this._cache.getProductResults();
      this.pager = this._cache.getProductPager();
    }
  }

  ngAfterViewInit() {
    let returnProduct = this._cache.getReturnProduct();
    if (returnProduct) {
      let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#' + returnProduct);
      this.pageScrollService.start(pageScrollInstance);
    }
  }

  searchProducts() {
    this.searching = true;
    this._cache.setProductSearch(this.query);
    this._appService.searchProducts(this.query)
      .subscribe(products => {
        this.products = products.result;
        this._cache.setProductResults(this.products);
        this.pager = products.pager;
        this._cache.setProductPager(this.pager);
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
        this._cache.setProductResults(this.products);
        this.pager = products.pager;
        this._cache.setProductPager(this.pager);
        this.searching = false;
      });
  }

  navigateToProductDetails(returnProduct: string) {
    this._cache.setReturnProduct(returnProduct);
    this._router.navigate(['/products', returnProduct]);
  }
}
