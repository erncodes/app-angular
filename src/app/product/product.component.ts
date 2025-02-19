import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '@syncfusion/ej2-angular-charts';
import { ProductCategory } from 'src/models/category';
import { Product } from 'src/models/product';
import { CategoryService } from 'src/services/category.service';
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
    this.allCategories = this.categoryService.GetAllCategories();
  }
  posManagementService : PosManagementService = inject(PosManagementService);
  categoryService : CategoryService = inject(CategoryService);
  productService : ProductService = inject(ProductService);
  isPanelExpanded : boolean = true;
  allProducts : any[] = [];
  allCategories : ProductCategory[] = [];
  isModalOpen : boolean = false;
  formMode : string = 'Add';
  
  @ViewChild('form')
      form: NgForm | undefined;

  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
  ToggleModal(id?: string){
    this.isModalOpen = !this.isModalOpen;
    if(id){
      let product = this.productService.GetProduct(id);
      this.formMode = 'Edit';
      if(product && this.form){
        this.form.setValue({
          name_El : product.title,
          description : product.description,
          quantity : product.leftInStock,
          price : product.price,
          category : product.category,
          imageUrl : product.imageUrl,
        })
      }
      

    }
    else{
      this.formMode = 'Add';
      this.form?.resetForm()
    }
  }
  FilterProducts(value? : string){
    if(value)
     this.allProducts = this.productService.GetAllProducts(value);
    else
    this.allProducts = this.productService.GetAllProducts();
  }
  FormSubmit(){

  }
}
