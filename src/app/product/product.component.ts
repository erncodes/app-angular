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
  isPriceAscend : boolean = false;
  isQuantityAscend : boolean = false;
  isBarcodeAscend : boolean = false;
  isNameAscend : boolean = false;
  
  @ViewChild('form')
      form: NgForm | undefined;

  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
  ToggleModal(short_barcode?: string){
    this.isModalOpen = !this.isModalOpen;
    if(short_barcode){
      let product = this.productService.GetProduct(short_barcode);
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
  OrderByName(){
    if(this.isNameAscend){
      this.allProducts.sort((a,b) => a.title.localeCompare(b.title));
      this.isNameAscend = !this.isNameAscend
    }
    else{
      this.allProducts.sort((a,b) => b.title.localeCompare(a.title));
      this.isNameAscend = !this.isNameAscend
    }
  }
  OrderByBarcode(){
    if(this.isBarcodeAscend){
      this.allProducts.sort((a,b) => a.short_barcode - b.short_barcode);
      this.isBarcodeAscend = !this.isBarcodeAscend
    }
    else{
      this.allProducts.sort((a,b) => b.short_barcode - a.short_barcode);
      this.isBarcodeAscend = !this.isBarcodeAscend
    }
  }
  OrderByQuantity(){
    if(this.isQuantityAscend){
      this.allProducts.sort((a,b) => a.quantity - b.quantity);
      this.isQuantityAscend = !this.isQuantityAscend
    }
    else{
      this.allProducts.sort((a,b) => b.quantity - a.quantity);
      this.isQuantityAscend = !this.isQuantityAscend
    }
  }
  OrderByPrice(){
    if(this.isPriceAscend){
      this.allProducts.sort((a,b) => a.price - b.price);
      this.isPriceAscend = !this.isPriceAscend
    }
    else{
      this.allProducts.sort((a,b) => b.price - a.price);
      this.isPriceAscend = !this.isPriceAscend
    }
  }
  FormSubmit(){

  }
}
