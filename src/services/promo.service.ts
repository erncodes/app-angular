import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Promotion } from 'src/models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor() { }
  httpClient : HttpClient = inject(HttpClient);

    GetPromotion(id : string) : Promotion | null{
      var promo = this.promotions.find(x => x.id == id);
      if(promo)
        return promo;
      return null;
    }
    EditPromotion(){}
    CreatePromotion(promo : Promotion){}
    DeletePromotion(){}
    GetAllPromotions(filter? : string) : Promotion[] | []{
      let filtered_promos = this.promotions;
      if(filter){
        if(filter === 'active'){
          filtered_promos = this.promotions.filter(x => x.isRunning);
          return filtered_promos;
        }
        else if(filter === 'inactive'){
          filtered_promos = this.promotions.filter(x => x.isRunning === false);
          return filtered_promos;
        }
        else
        return this.promotions;
      }
      return this.promotions;
    }
    promotions : Promotion[] = [
      { promoName : 'Festive Bonanza', startDate : new Date(2024,12,15),
        promoItems : [160015,160016,160040,160041,160060,160061],endDate : new Date(2024,12,22), 
        isRunning : false, createdBy : 'Siya'},
      { promoName : 'Purple Week', startDate : new Date(2024,11,5),
        promoItems : [160015,160016,160040,160041,160060,160061],endDate : new Date(2024,11,12), 
        isRunning : false, createdBy : 'Emily'},
      { promoName : 'New Year Promo', startDate : new Date(2025,1,5),
        promoItems : [160015,160016,160040,160041,160060,160061],endDate : new Date(2025,1,12), 
        isRunning : false, createdBy : 'Emily'},
      { promoName : "Valentine's Special", startDate : new Date(2025,2,9),
        promoItems : [160015,160016,160040,160041,160060,160061],endDate : new Date(2025,2,16), 
        isRunning : true, createdBy : 'Siya'},
    ]
}
