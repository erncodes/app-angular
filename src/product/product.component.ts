import { Component, inject, OnInit } from '@angular/core';
import { PosManagementService } from 'src/services/pos-management.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  ngOnInit(): void {
    this.allProducts = this.productService.GetAllProducts();
  }
  posManagementService : PosManagementService = inject(PosManagementService);
  productService : ProductService = inject(ProductService);
  isPanelExpanded : boolean = true;
  allProducts : any[] = [];

  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
}
