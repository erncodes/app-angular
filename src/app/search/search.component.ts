import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
    allProducts : Product[] = [];
    productService : ProductService = inject(ProductService);
  
  ngOnInit(): void {
    this.allProducts = this.productService.GetAllProducts();
  }

}
