import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productSearchSub: any;

  constructor() { }
  httpClient : HttpClient = inject(HttpClient);

  products : Product[] = [];
  filteredProdArray : any[] = [];
  searchProducts : Product[] = [];
  sortedProductsSubject : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  GetProduct(short_barcode : string) : Product | null{
    let product = this.products.find(c => c.short_barcode == +short_barcode);
    if(product)
      return product;
    return null;

   /* this.httpClient.get<{[key : string] : Product}>('https://urbanstrides-640e5-default-rtdb.europe-west1.firebasedatabase.app/products/'+short_barcode+'.json')
    .pipe(map((response)=>{
      let prod = {};
      prod = {...response, short_barcode : short_barcode};
      return prod;
    })).subscribe((product)=>{
    }) */

  }
  EditProduct(){}
  CreateProduct(product : Product){}
  DeleteProduct(){}

  GetAllProducts(){
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin','*');
   this.httpClient.get<{ [key : string] : Product}>('https://dufty-pos-default-rtdb.europe-west1.firebasedatabase.app/products.json',{headers : headers})
     .pipe(map((data)=>{
     let prods = [];
     for(let key in data){
       if(data.hasOwnProperty(key))
       {
         prods.push({...data[key],id : key})
       }
     }
     return prods;
   })).subscribe((prods)=>{
     this.products = prods;
     this.sortedProductsSubject.next(this.products);
   });
  
  }
  GetProductsFiltered(filter? : string): Product[] | [] {
    let filtered_products : Product[] = [];
    if(filter){
      switch(filter){
        case 'burgers':
          filtered_products = this.products.filter(x => x.category.toLocaleLowerCase() === 'burgers');
          break;
        case 'meals':
          filtered_products = this.products.filter(x => x.category.toLocaleLowerCase() === 'meals');
          break;
        case 'pizzas':
          filtered_products = this.products.filter(x => x.category.toLocaleLowerCase() === 'pizzas');
          break;
        case 'drinks':
          filtered_products = this.products.filter(x => x.category.toLocaleLowerCase() === 'drinks');
          break;
        default:
          filtered_products = this.products;
          break;
      }
      return filtered_products;
    }
    return this.products;
  }
}
