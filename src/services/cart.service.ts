import { inject, Injectable } from '@angular/core';
import { Product } from 'src/models/product';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductService } from './product.service';
import { NotificationService } from './notification.service';
import { Sale } from 'src/models/sale';
import { HttpClient } from '@angular/common/http';

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

  productService : ProductService = inject(ProductService);
  notificationService : NotificationService = inject(NotificationService);
  httpClient : HttpClient = inject(HttpClient);

  filteredProdsSub : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  productsInCart : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
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
    this.httpClient.post('https://dufty-pos-default-rtdb.europe-west1.firebasedatabase.app/sales',sale).subscribe({
      next: (res)=>{this.notificationService.ShowSuccessNotification('New Sale Added!')},
      error:(err)=>{this.notificationService.ShowErrorNotification(err.message)}
    })
  }
}