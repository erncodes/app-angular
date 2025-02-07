import { inject, Injectable } from '@angular/core';
import { Product } from 'src/models/product';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { 
    this.products = this.productService.GetAllProducts();
  }
  filteredProdArray : any[] = [];
  cartProducts :Product[]  = [];
  cartTotal : number = 0;
  products : Product[] = [];

  productService : ProductService = inject(ProductService);

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

  addToCart(id : string){
    var selectedProd = this.products.find(product=>product.id === +id);

    if(selectedProd){
      this.cartProducts.push(selectedProd);
      this.productsInCart.next(this.cartProducts);
      this.cartTotal += selectedProd.price;
      this.cartTotalSubject.next(this.cartTotal);
      this.productPriceSubject.next(selectedProd.price);
    }
  }

  clearCart(){
    this.cartProducts = [];
    this.productsInCart.next(this.cartProducts);
    this.cartTotal = 0;
    this.cartTotalSubject.next(this.cartTotal);
    this.productPriceSubject.next(0);
  }

}