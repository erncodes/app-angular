export class Product
{
constructor(
      public short_barcode : number, public title : string, public description : string, public category : string,
      public imageUrl : string,  public leftInStock : number, public price : number, public discount : number = 0,
      public rating : number = 5,public size : string='standard',
      public isInStock : boolean = true,public isInPromo : boolean = false,
      ){}
}