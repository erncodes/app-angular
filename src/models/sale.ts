import { Product } from "./product";

export class Sale
{
constructor(
      public id : string | undefined, public cashierName : string, 
      public dateTime : Date, public items : Product[], public total : number, public isFinalised : boolean = false
      ){}
}