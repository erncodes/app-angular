import { inject, Injectable } from '@angular/core';
import { Product } from 'src/models/product';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { ProductService } from './product.service';
import { NotificationService } from './notification.service';
import { Sale } from 'src/models/sale';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { 
    this.productService.sortedProductsSubject.subscribe((prods)=>{
      this.products = prods;
    })
  }
  filteredProdArray : any[] = [];
  cartProducts :Product[]  = [];
  cartTotal : number = 0;
  products : Product[] = [];
  sales : Sale[] = [];
  filtered_sales : Sale[] = [];

  pizzaCount = 0;
  burgerCount = 0;
  mealCount = 0;
  pizzaTotal = 0;
  burgerTotal = 0;
  mealTotal = 0;

  pizzaTotalSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  mealTotalSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  burgerTotalSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pizzaCountSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  mealCountSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  burgerCountSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0);

  productService : ProductService = inject(ProductService);
  notificationService : NotificationService = inject(NotificationService);
  httpClient : HttpClient = inject(HttpClient);

  filteredProdsSub : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  productsInCart : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  salesSubject : BehaviorSubject<Sale[]> = new BehaviorSubject<Sale[]>([]);
  cartTotalSubject : BehaviorSubject<number> = new BehaviorSubject<number>(0); 
  productPriceSubject : Subject<number> = new Subject<number>();


  getSelectedPopular(filterText? : string){
    if(filterText == ''){
      this.filteredProdArray = this.products.filter(prod => prod.rating > 4.5 && prod.category == 'Burgers');
      this.filteredProdsSub.next(this.filteredProdArray);
     return this.filteredProdArray;
    }
    else{
      this.filteredProdArray = this.products.filter(prod => prod.rating > 4.5 && prod.category == filterText);
      this.filteredProdsSub.next(this.filteredProdArray);
     return this.filteredProdArray;
    }
  }

  getProducts() : Product[] | []{
    return this.products;
  }
  RemoveItem(short_barcode : string){
    var selectedProd = this.products.find(product=>product.short_barcode === +short_barcode);
    if(selectedProd){
      const i = this.cartProducts.findIndex(product=>product.short_barcode === +short_barcode);
      if(i != -1){
        this.cartProducts.splice(i,1);
      }
      else{
        this.notificationService.ShowErrorNotification('An unknown error occured.');
        return null;
      }
      this.productsInCart.next(this.cartProducts);
      this.cartTotal -= selectedProd.price;
      this.cartTotalSubject.next(this.cartTotal);
      return selectedProd;
    }
    return null;
  }
  addToCart(short_barcode : string){
    var selectedProd = this.products.find(product=>product.short_barcode === +short_barcode);

    if(selectedProd){
      this.cartProducts.push(selectedProd);
      this.productsInCart.next(this.cartProducts);
      this.cartTotal += selectedProd.price;
      this.cartTotalSubject.next(this.cartTotal);
      this.productPriceSubject.next(selectedProd.price);
      return selectedProd;
    }
    return null;
  }

  clearCart(){
    this.cartProducts = [];
    this.productsInCart.next(this.cartProducts);
    this.cartTotal = 0;
    this.cartTotalSubject.next(this.cartTotal);
    this.productPriceSubject.next(0);
  }
  FinalizeSale(sale : Sale){
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin','*');
    this.httpClient.post('https://dufty-pos-default-rtdb.europe-west1.firebasedatabase.app/sales.json',sale,{headers : headers}).subscribe({
      next: (res)=>{this.notificationService.ShowSuccessNotification('New Sale Added!')
      this.cartProducts = [];
      this.productsInCart.next(this.cartProducts);
      this.cartTotal = 0;
      this.cartTotalSubject.next(this.cartTotal);
      },
      error:(err)=>{this.notificationService.ShowErrorNotification(err.message)
      }
    })
  }
  GetAllSales(){
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin','*');
    this.httpClient.get<{ [key : string] : Sale}>('https://dufty-pos-default-rtdb.europe-west1.firebasedatabase.app/sales.json',{headers : headers})
    .pipe(map((data)=>{
    let salesArray = [];
     for(let key in data){
       if(data.hasOwnProperty(key))
        {
         salesArray.push({...data[key],id : key})
        }
       }
       return salesArray;
      })).subscribe((sales)=>{
      this.sales = sales;
      this.filtered_sales = this.sales;
      this.salesSubject.next(sales);
      this.GetFilteredSales(sales)
      });
      }
    
    GetFilteredSales(sales : Sale[]){
      sales.forEach((sale)=>{
        this.GetProductsInfo(sale);
      })
      this.pizzaCountSubject.next(this.pizzaCount);
      this.pizzaTotalSubject.next(this.pizzaTotal);
      this.burgerCountSubject.next(this.burgerCount);
      this.burgerTotalSubject.next(this.burgerTotal);
      this.mealCountSubject.next(this.mealCount);
      this.mealTotalSubject.next(this.mealTotal);
    return sales;
    }

    GetProductsInfo(sale : Sale){
   
      sale.products.forEach(product => {
        if(product.category == 'Pizzas'){
          this.pizzaCount += 1;
          this.pizzaTotal += product.price;
        }
        else if(product.category == 'Meals'){
          this.burgerCount += 1;
          this.burgerTotal += product.price
        }
        else if(product.category == 'Burgers'){
          this.mealCount += 1;
          this.mealTotal += product.price;
        }
      });
    }
  }