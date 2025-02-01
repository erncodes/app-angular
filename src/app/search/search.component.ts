import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Product } from 'src/models/product';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
    allProducts : Product[] = [];
    productService : ProductService = inject(ProductService);
    cartService : CartService = inject(CartService);

    @Output()
    closeSearch : EventEmitter<string> = new EventEmitter<string>()
  
  ngOnInit(): void {
    this.allProducts = this.productService.GetAllProducts();
  }
  AddToCartFromSearch(item : Product){
    this.cartService.addToCart(item.id.toString());
    this.closeSearch.emit();
  }
}
