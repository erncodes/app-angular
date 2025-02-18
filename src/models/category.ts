export class ProductCategory
{
constructor(
      public id : string | number, public categoryName : string, 
      public description : string = "", public totalProducts : number = 0
      ){}
}