import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  ngOnInit(): void {
    this.allPromos = this.promoService.GetAllPromotions();
  }
  posManagementService : PosManagementService = inject(PosManagementService);
  productService : ProductService = inject(ProductService);
  promoService : PromoService = inject(PromoService);
  isModalOpen : boolean = false;

  @ViewChild('form')
    form: NgForm | undefined;

  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
  ToggleModal(){
    this.isModalOpen = !this.isModalOpen;
  }
  EditPromo(promo : Promotion){
  }
  FormSubmit(){}
}
