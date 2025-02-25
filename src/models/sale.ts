import { Product } from "./product";

export class Sale
{
constructor(
      public id : string | undefined, public cashierName : string, 
      public dateTime : Date, public productIds : string[] | number[], public total : number
      ){}
}