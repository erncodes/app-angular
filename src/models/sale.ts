import { Product } from "./product";

export class Sale
{
constructor(
      public cashierName : string, 
      public dateTime : Date, public products : Product[] | number[], public total : number, public id? : string | undefined,
      ){}
}