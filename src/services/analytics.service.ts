import { Injectable } from '@angular/core';
import { Sale } from 'src/models/sale';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }
       GetCategory(id : string) : Sale | null{
        let sale = this.sales.find(x => x.id == id);
        if(sale)
          return sale;
        return null;
       }
        EditSale(){}
        CreateSale(sale : Sale){}
        DeleteSale(){}
        GetAllSales() : Sale[] | []{
          return this.sales;
        }
        GetAllSalesByCategory(month? : string) : Sale[] | []{
          return this.sales;
        }
        GetMonthName(sale : Sale) : string | null{
          let date = sale.dateTime.getMonth();
          let monthName = "";
          switch(date){
            case 0:
              monthName = 'Jan';
              return monthName;
            case 1:
              monthName = 'Feb';
              return monthName;
            case 2:
              monthName = 'Mar';
              return monthName;
            case 3:
              monthName = 'Apr';
              return monthName;
            case 4:
              monthName = 'May';
              return monthName;
            case 5:
              monthName = 'Jun';
              return monthName;
            case 6:
              monthName = 'Jul';
              return monthName;
            case 7:
              monthName = 'Aug';
              return monthName;
            case 8:
              monthName = 'Sep';
              return monthName;
            case 9:
              monthName = 'Oct';
              return monthName;
            case 10:
              monthName = 'Nov';
              return monthName;
            case 11:
              monthName = 'Dec';
              return monthName;
            default:
              return null;
          }
        }
  
        sales : Sale [] = [
          {id : '120100', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,15),productIds : [160015,160016,160040,160041,160061,160061],total : 2355},
          {id : '120101', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,10),productIds : [160017,160016,160040,160041,160061,160061],total : 1355},
          {id : '120102', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,3),productIds : [160015,160016,160040,160043,160060,160061],total : 2105},
          {id : '120103', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,7),productIds : [160017,160016,160040,160041,160060,160061],total : 1255},
          {id : '120104', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,14),productIds : [160015,160016,160040,160041,160060,160061],total : 1955},
          {id : '120105', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,17),productIds : [160021,160022,160048,160044,160063,160064],total : 1355},
          {id : '120106', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,18),productIds : [160015,160016,160041,160041,160062,160061],total : 1705},
          {id : '120107', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,14),productIds : [160012,160016,160040,160046,160060,160061],total : 1355},
          {id : '120108', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,1),productIds : [160019,160018,160045,160041,160067,160061],total : 1055},
          {id : '120109', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,19),productIds : [160025,160017,160040,160049,160060,160061],total : 1755},
          {id : '120110', cashierName : 'Lauren Skitz', dateTime : new Date(2025,1,6),productIds : [160015,160019,160041,160045,160063,160061],total : 1655},
         
        ]
}
