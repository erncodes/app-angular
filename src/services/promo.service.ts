import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Promotion } from 'src/models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor() { }
  promotions : Promotion[] = [];
  promoSubject : BehaviorSubject<Promotion[]> = new BehaviorSubject<Promotion[]>(this.promotions);
  httpClient : HttpClient = inject(HttpClient);

    GetPromotion(id : string) : Promotion | null{
       
      var promo = this.promotions.find(x => x.id == id);
      if(promo)
        return promo;
      return null;
    }
    GetAllPromotions(){
      let headers = new HttpHeaders();
      headers = headers.set('Access-Control-Allow-Origin','*');
      this.httpClient.get<{ [key : string] : Promotion}>('https://dufty-pos-default-rtdb.europe-west1.firebasedatabase.app/promotions.json',{headers : headers})
      .pipe(map((data)=>{
      let promoArray = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
          {
            promoArray.push({...data[key],id : key})
          }}
          return promoArray;
          })).subscribe((promotions)=>{
            this.promotions = promotions;
            this.promoSubject.next(this.promotions);
          });
    }
    EditPromotion(){}
    CreatePromotion(promo : Promotion){}
    DeletePromotion(){}
    GetFilteredPromotions(filter? : string) : Promotion[] | []{
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
}
