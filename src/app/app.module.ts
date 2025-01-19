import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopularProductsComponent } from './popular-products/popular-products.component';
import { PosManagementComponent } from './pos-management/pos-management.component';
import { LoginComponent } from '../login/login.component';
import { ProductComponent } from '../product/product.component';
import { UserComponent } from '../user/user.component';
import { PromoComponent } from '../promo/promo.component';

@NgModule({
  declarations: [
    PopularProductsComponent,
    AppComponent,
    PosManagementComponent,
    LoginComponent,
    ProductComponent,
    UserComponent,
    PromoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
