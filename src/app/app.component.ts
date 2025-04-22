import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth-.service';
import { CartService } from 'src/services/cart.service';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { PromoService } from 'src/services/promo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.productService.GetAllProducts();
    this.categoryService.GetAllCategories();
    this.promoService.GetAllPromotions();
    this.authService.GetAllUsers();
    this.authService.AutoLogin();
    this.cartService.GetAllSales();
  }
  productService : ProductService = inject(ProductService);
  categoryService : CategoryService = inject(CategoryService);
  promoService : PromoService = inject(PromoService);
  authService : AuthService = inject(AuthService);
  cartService : CartService = inject(CartService);
  router : Router = inject(Router);
  
}
