import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopularProductsComponent } from './popular-products/popular-products.component';
import { PosManagementComponent } from './pos-management/pos-management.component';
import { LoginComponent } from '../login/login.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from '../user/user.component';
import { PromoComponent } from '../promo/promo.component';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { PosTransactComponent } from './pos-transact/pos-transact.component';
import { SearchComponent } from './search/search.component';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule,LineSeriesService,ColumnSeriesService,CategoryService,LegendService,DataLabelService,TooltipService,
  AccumulationChartModule,AccumulationLegendService,AccumulationDataLabelService,AccumulationTooltipService,PieSeriesService } from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [
    PopularProductsComponent,
    AppComponent,
    PosManagementComponent,
    LoginComponent,
    ProductComponent,
    UserComponent,
    PromoComponent,
    AnalyticsComponent,
    PosTransactComponent,
    SearchComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartModule,AccumulationChartModule
  ],
  providers: [LineSeriesService,ColumnSeriesService,CategoryService,LegendService,DataLabelService,TooltipService,
    AccumulationLegendService,AccumulationDataLabelService,AccumulationTooltipService,PieSeriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
