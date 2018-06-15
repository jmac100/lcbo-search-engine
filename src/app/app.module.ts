import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppService, CacheService, GeolocationService } from './services';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { StoresComponent } from './stores/stores.component';
import { StoreHoursConverterPipe } from './shared/store-hours-converter.pipe';
import { StoreComponent } from './store/store.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { MetresToKilometresPipe } from './shared/metres-to-kilometres.pipe';
import { OffersComponent } from './offers/offers.component';
import { Ng2PageScrollModule } from "ng2-page-scroll";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    StoresComponent,
    StoreHoursConverterPipe,
    StoreComponent,
    ProductsComponent,
    ProductComponent,
    MetresToKilometresPipe,
    OffersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LazyLoadImageModule,
    Ng2PageScrollModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'stores/:id', component: StoreComponent },
      { path: 'products/:id', component: ProductComponent },
      { path: 'stores', component: StoresComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'offers', component: OffersComponent }
    ])
  ],
  providers: [AppService, CacheService, GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
