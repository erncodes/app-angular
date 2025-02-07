import { Product } from "./product";

export class Promotion
{
constructor(
      public id : number , public promoName : string,public startDate : Date, public endDate : Date, 
      public promoItems : number[], public isRunning : boolean = false, public createdBy : string
      ){}
}