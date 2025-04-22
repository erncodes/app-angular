import { Component, inject, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { NotificationService } from 'src/services/notification.service';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit{

  mockData : Object[] = [];
  mockPieData : Object[] = [];
  mockPieData2 : Object[] = [];
  xAxis : any;
  yAxis : any;
  legend : any;
  markerSettings : any;
  toolTipSettings : any;
  pieLabelSettings : any;
  chartTitle : string = "";
  chartPieTitle : string = "";
  chartPieTitle2 : string = "";
  date : Date = new Date(2025,1,15);

  pizzaCount : number = 0;
  burgerCount : number = 0;
  mealCount : number = 0;
  pizzaTotal : number = 0;
  burgerTotal : number = 0;
  mealTotal : number = 0;

  ngOnInit(): void {
    this.cartService.burgerCountSubject.subscribe({
      next : (count)=>{ this.burgerCount = count},
      error: (err) =>{ this.notificationService.ShowErrorNotification(err.message)}
    })
    this.cartService.pizzaCountSubject.subscribe({
      next : (count)=>{ this.pizzaCount = count},
      error: (err) =>{ this.notificationService.ShowErrorNotification(err.message)}
    })
    this.cartService.mealCountSubject.subscribe({
      next : (count)=>{ this.mealCount = count},
      error: (err) =>{ this.notificationService.ShowErrorNotification(err.message)}
    })
    this.cartService.burgerTotalSubject.subscribe({
      next : (total)=>{ this.burgerTotal = total},
      error: (err) =>{ this.notificationService.ShowErrorNotification(err.message)}
    })
    this.cartService.pizzaTotalSubject.subscribe({
      next : (total)=>{ this.pizzaTotal = total},
      error: (err) =>{ this.notificationService.ShowErrorNotification(err.message)}
    })
    this.cartService.mealTotalSubject.subscribe({
      next : (total)=>{ this.mealTotal = total},
      error: (err) =>{ this.notificationService.ShowErrorNotification(err.message)}
    })
    this.mockData = [
      {month:'Jan',sales:35},{month:'Feb',sales:45},{month:'Mar',sales:15},{month:'Apr',sales:75},
      {month:'May',sales:35},{month:'Jun',sales:85},{month:'Jul',sales:55},{month:'Aug',sales:45},
      {month:'Sep',sales:25},{month:'Oct',sales:95},{month:'Nov',sales:65},{month:'Dec',sales:75},
    ]
    this.mockPieData = [
      {name:'Pizza',total : this.pizzaTotal,text : ((this.pizzaTotal/(this.mealTotal + this.pizzaTotal+ this.burgerTotal))*100).toFixed(1) + '%'},{name:'Burger',total : this.burgerTotal,text : ((this.burgerTotal/(this.mealTotal + this.pizzaTotal+ this.burgerTotal))*100).toFixed(1) + '%'},{name:'Meal',total : this.mealTotal,text : ((this.mealTotal/(this.mealTotal + this.pizzaTotal+ this.burgerTotal))*100).toFixed(1) + '%'},
      {name:'Drink',total : 0,text : '0%'}
    ]
    this.mockPieData2 = [
      {name:'In Stock',total : 3200,text : '40%'},{name:'Out-Of-Stock',total : 2200,text : '28%'},{name:'Damaged',total : 1500,text : '18%'}
    ]
    this.xAxis = {
      valueType : 'Category',
      title : 'Months',
    };
    this.yAxis = {
      title : 'Sales'
    };
    this.legend = {
      visible : true
    };
    this.toolTipSettings = {
      enable : true
    };
    this.markerSettings = {
      visible : true,
      dataLabel : {
        visible : true
      }
    };
    this.pieLabelSettings = {
      visible : true,
      position : 'Outside',
      name : 'text'
    };
    this.chartPieTitle = 'Top Selling';
    this.chartPieTitle2 = 'Inventory';
    this.chartTitle = 'Sales';
    
  }
 
  cartService : CartService = inject(CartService);
  notificationService : NotificationService = inject(NotificationService);
  posManagementService : PosManagementService = inject(PosManagementService);
  
  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
}
