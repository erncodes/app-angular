import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Helper } from 'src/models/helper';
import { Product } from 'src/models/product';
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

  @Output() 
  productEmi : EventEmitter<Helper> = new EventEmitter<Helper>();

  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }

  Toggle(){
    var obj = new Helper('Product');
    this.productEmi.emit(obj);
  }
  EditProduct(product : Product){
    var obj = new Helper('EditProduct',product);
    this.productEmi.emit(obj);
  }
}
