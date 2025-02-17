import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  isModalOpen : boolean = false;
  
  @ViewChild('form')
      form: NgForm | undefined;

  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
  ToggleModal(){
    this.isModalOpen = !this.isModalOpen;
  }
  EditProduct(product : Product){
  }
  FormSubmit(){}
}
