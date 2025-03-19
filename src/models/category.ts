export class ProductCategory
{
constructor(
      public categoryName : string, 
      public description : string = "", public totalProducts : number = 0,public id? : string | undefined
      ){}
}