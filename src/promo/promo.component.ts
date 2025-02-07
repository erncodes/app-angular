import { Component, inject, OnInit } from '@angular/core';
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

  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
}
