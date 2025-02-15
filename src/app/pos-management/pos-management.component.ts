import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/models/category';
import { Helper } from 'src/models/helper';
import { Product } from 'src/models/product';
import { Promotion } from 'src/models/promotion';
import { CategoryService } from 'src/services/category.service';
import { PosManagementService } from 'src/services/pos-management.service';
import { ProductService } from 'src/services/product.service';
import { PromoService } from 'src/services/promo.service';

@Component({
  selector: 'app-pos-management',
  templateUrl: './pos-management.component.html',
  styleUrls: ['./pos-management.component.css']
})
export class PosManagementComponent implements OnInit{

  posManagementService : PosManagementService = inject(PosManagementService);
  categoryService : CategoryService = inject(CategoryService);
  productService : ProductService = inject(ProductService);
  promoService : PromoService = inject(PromoService);
  router : Router = inject(Router);
  activePanel : string = 'PosManagement';
  isCreateMode : boolean = false;
  emittedValue = '';

  @ViewChild('formi')
  form: NgForm | undefined;

  FormSubmit(){
    if(this.form){
      /*switch(this.emittedValue){
        case 'Product':
            this.productService.CreateProduct(new Product(123, this.form.value.name, this.form.value.description, 
            this.form.value.category, this.form.value.size, this.form.value.imageUrl, 
            this.form.value.isInStock || false,this.form.value.isInPromo || false, this.form.value.leftInStock | 0, 
            this.form.value.price, this.form.value.discount | 0, this.form.value.rating | 0))
          break;
        case 'EditProduct':
            this.productService.EditProduct()
            break;
        case 'Promotion':
            this.promoService.CreatePromotion(new Promotion(123,this.form.value.name,this.form.value.start_date,
            this.form.value.end_date,this.form.value.items_count,this.form.value.isRunning || false, "Username"))
            break;
        case 'EditPromotion':
            this.promoService.EditPromotion()
            break;
        case 'Category':
            this.categoryService.CreateCategory(new Category(123,this.form.value.name,this.form.value.description,
            this.form.value.items_count | 0))
            break;
        case 'EditCategory':
            this.categoryService.EditCategory()
            break;
            default:
            break;
      }*/
     console.log(this.form.value.name)
    }
  }

  SwitchActivePanel(value : string){
    this.activePanel = value;
  }
  SignOut(){
    this.router.navigate(['/']);
  }
  /***      public id : number, public title : string, public description : string, public category : string, public size : string,
      public imageUrl : string, public isInStock : boolean,public isInPromo : boolean, public leftInStock : number, 
      public price : number, public discount : number | 0, public rating : number = 0 */
  ToggleCreateMode(objectP : Helper){
    this.emittedValue = objectP.title;
    this.isCreateMode = ! this.isCreateMode;
    if(this.form){
      switch(objectP.title){
        case 'EditProduct':
          this.form.setValue({
            name_El : objectP.product?.title,
            description : objectP.product?.description,
            price : objectP.product?.price,
          })
          console.log(this.form.value)
          break;
      }
    }
  }
  ngOnInit(): void {
    this.posManagementService.activePanelSubject.subscribe((text)=>{
      this.activePanel = text;
    })
  }

}
