import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth-.service';
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
  authService : AuthService = inject(AuthService);
  router : Router = inject(Router);
  activePanel : string = 'PosManagement';
  isCreateMode : boolean = false;
  emittedValue = '';

  @ViewChild('formi')
  form: NgForm | undefined;

  SwitchActivePanel(value : string){
    this.activePanel = value;
  }
  SignOut(){
    this.authService.LogOut();
  }
  ngOnInit(): void {
    this.posManagementService.activePanelSubject.subscribe((text)=>{
      this.activePanel = text;
    })
  }
}
