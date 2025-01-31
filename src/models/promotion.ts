import { Product } from "./product";

export class Sale
{
constructor(
      public id : string , public promoName : string,public startDate : Date, public endDate : Date, 
      public promoItems : Product[], public isRunning : boolean = false, public createdBy : string
      ){}
}