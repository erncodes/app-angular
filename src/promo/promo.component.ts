import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/models/product';
import { Promotion } from 'src/models/promotion';
import { PosManagementService } from 'src/services/pos-management.service';
import { ProductService } from 'src/services/product.service';
import { PromoService } from 'src/services/promo.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit{

  allPromos : Promotion[] = [];
  promoItems : Product[] = [];

  ngOnInit(): void {
    this.allPromos = this.promoService.GetAllPromotions();
  }
  posManagementService : PosManagementService = inject(PosManagementService);
  productService : ProductService = inject(ProductService);
  promoService : PromoService = inject(PromoService);
  isModalOpen : boolean = false;
  formMode : string = 'Add';
  promoStatus : boolean = false;
  isNameAscend : boolean = false;
  isStatusAscend : boolean = false;
  isCreatorAscend : boolean = false;


  @ViewChild('form')
    form: NgForm | undefined;

  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
  ToggleModal(id? : string){
    this.isModalOpen = !this.isModalOpen;
    if(id){
      this.GetPromoItems(id);
      let promo = this.promoService.GetPromotion(id);
      this.formMode = 'Edit';
      if(promo && this.form){
        this.promoStatus = promo.isRunning
        this.form.setValue({
          name_El : promo.promoName,
          sdate_El_lbl : promo.startDate.toDateString() ,
          edate_El_lbl : promo.endDate.toDateString(),
          status : promo.isRunning,
          promo_items : this.promoItems
        })
      }
      

    }
    else{
      this.formMode = 'Add';
      this.promoStatus = false;
      this.form?.resetForm()
      this.promoItems = [];
    }
  }
  FilterPromo(value? : string){
    if(value)
      this.allPromos = this.promoService.GetAllPromotions(value);
     else
     this.allPromos = this.promoService.GetAllPromotions();
  }
  SDateChanged(date_el : any){
    let new_start_date = new Date(date_el.value);
      this.form?.setValue({
        name_El : this.form.value.name_El ? this.form.value.name_El : "",
        sdate_El_lbl : new_start_date.toDateString(),
        edate_El_lbl : this.form.value.edate_El_lbl ? this.form.value.edate_El_lbl : "",
        status : this.promoStatus,
        promo_items : this.promoItems ? this.promoItems : null
      })
  }
  EDateChanged(date_el : any){
    let new_end_date = new Date(date_el.value);
      this.form?.setValue({
        name_El : this.form.value.name_El ? this.form.value.name_El : "",
        sdate_El_lbl : this.form.value.sdate_El_lbl ? this.form.value.sdate_El_lbl : "",
        edate_El_lbl : new_end_date.toDateString(),
        status : this.promoStatus,
        promo_items : this.promoItems ? this.promoItems : null
      })
  }
  GetPromoItems(id : string) : Product[] | null{
    let promo = this.promoService.GetPromotion(id);
    if(promo){
      if(promo.promoItems.length > 0){
        for(let prod_id of promo.promoItems){
          let x = this.productService.GetProduct(prod_id.toString());
          if(x)
            this.promoItems.push(x);
        }
      }
      return this.promoItems;
    }
    return null;
  }
  OrderByName(){
    if(this.isNameAscend){
      this.allPromos.sort((a,b) => a.promoName.localeCompare(b.promoName));
      this.isNameAscend = !this.isNameAscend
    }
    else{
      this.allPromos.sort((a,b) => b.promoName.localeCompare(a.promoName));
      this.isNameAscend = !this.isNameAscend
    }
  }
  OrderByCreator(){
    if(this.isCreatorAscend){
      this.allPromos.sort((a,b) => a.createdBy.localeCompare(b.createdBy));
      this.isCreatorAscend = !this.isCreatorAscend
    }
    else{
      this.allPromos.sort((a,b) => b.createdBy.localeCompare(a.createdBy));
      this.isCreatorAscend = !this.isCreatorAscend
    }
  }
  OrderByStatus(){
    if(this.isStatusAscend){
      this.allPromos.sort((a,b) => a.isRunning.toString().localeCompare(b.isRunning.toString()));
      this.isStatusAscend = !this.isStatusAscend
    }
    else{
      this.allPromos.sort((a,b) => b.isRunning.toString().localeCompare(a.isRunning.toString()));
      this.isStatusAscend = !this.isStatusAscend
    }
  }
  FormSubmit(id? : string){

  }
}
