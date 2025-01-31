import { Component, inject, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css']
})
export class PopularProductsComponent implements OnInit{
  productService : ProductService = inject(ProductService);
  cartService : CartService = inject(CartService);
  selectedPopularProducts : any[] = [];
  activeMenu : string = 'Burger';


  ngOnInit(): void {
    this.cartService.getSelectedPopular('Burgers');
    this.cartService.filteredProdsSub.subscribe((products)=>{
      this.selectedPopularProducts =  products;
    })
  }
  AddToCart(id : string){
    this.cartService.addToCart(id);
  }

}
