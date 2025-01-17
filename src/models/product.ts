export class Product
{
constructor(
      public id : number ,public title : string , public description : string,public category : string , public size : string,
      public imageUrl : string, public isInStock : boolean,public isInPromo : boolean, public leftInStock : number, 
      public price : number, public discount : number | 0,public rating : number = 0
      ){}
}