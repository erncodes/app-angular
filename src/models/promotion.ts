import { Product } from "./product";

export class Promotion
{
constructor(
      public promoName : string,public startDate : Date, public endDate : Date, 
      public promoItems : number[], public isRunning : boolean = false, public createdBy : string,public id? : string | undefined 
      ){}
}