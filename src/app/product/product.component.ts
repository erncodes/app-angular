import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '@syncfusion/ej2-angular-charts';
import { ProductCategory } from 'src/models/category';
import { Product } from 'src/models/product';
import { CategoryService } from 'src/services/category.service';
import { NotificationService } from 'src/services/notification.service';
import { PosManagementService } from 'src/services/pos-management.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  ngOnInit(): void {
    this.productService.sortedProductsSubject.subscribe((prods)=>{
      this.allProducts = prods;
    });
    this.categoryService.categorySubject.subscribe((categories) =>{
      this.allCategories = categories;
    })
  }
  posManagementService : PosManagementService = inject(PosManagementService);
  notificationService : NotificationService = inject(NotificationService);
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
  selectedCategory : string = '';
  
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
     this.allProducts = this.productService.GetProductsFiltered(value);
    else
    this.allProducts = this.productService.GetProductsFiltered();
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
  FormSubmit(form : NgForm){
    /*public short_barcode : number, public title : string, public description : string, public category : string, public size : string,
      public imageUrl : string, public isInStock : boolean,public isInPromo : boolean, public leftInStock : number, 
      public price : number, public discount : number | 0, public rating : number = 0*/
    //const newProd = new Product();
    if(form.valid){
      console.log(form.value)
      const prod = new Product(form.value.barcode,form.value.name_el,form.value.description,form.value.category,form.value.image_url,+form.value.quantity,form.value.price);
      this.productService.CreateProduct(prod);      
    }
    else{
      this.notificationService.ShowErrorNotification("Fill In All The Fields.")
    }
  }
}
