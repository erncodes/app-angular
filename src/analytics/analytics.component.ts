import { Component, inject, OnInit } from '@angular/core';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit{

  mockData : Object[] = [];
  mockPieData : Object[] = [];
  xAxis : any;
  yAxis : any;
  legend : any;
  markerSettings : any;
  toolTipSettings : any;
  pieLabelSettings : any;
  chartTitle : string = "";
  chartPieTitle : string = "";
  date : Date = new Date(2025,1,15);


  constructor() {
    this.mockData = [
      {month:'Jan',sales:35},{month:'Feb',sales:45},{month:'Mar',sales:15},{month:'Apr',sales:75},
      {month:'May',sales:35},{month:'Jun',sales:85},{month:'Jul',sales:55},{month:'Aug',sales:45},
      {month:'Sep',sales:25},{month:'Oct',sales:95},{month:'Nov',sales:65},{month:'Dec',sales:75},
    ]
    this.mockPieData = [
      {name:'Pizza',total : 3200,text : '40%'},{name:'Burger',total : 2200,text : '28%'},{name:'Meal',total : 1500,text : '18%'},
      {name:'Drink',total : 600,text : '14%'}
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
    this.chartTitle = 'Sales';
  }
  ngOnInit(): void {
    console.log(this.date.getMonth() > 1)
    console.log();
  }
  posManagementService : PosManagementService = inject(PosManagementService);
  
  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
}
