import {  AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/models/product';
import { CartService } from 'src/services/cart.service';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-pos-transact',
  templateUrl: './pos-transact.component.html',
  styleUrls: ['./pos-transact.component.css']
})
export class PosTransactComponent implements OnInit,AfterViewInit{
  ngAfterViewInit(): void {
    if(this.doc)
    this.doc.autofocus
  }

  isPanelExpanded : boolean = false;
  isSearchMode : boolean = false;
  isPOSMode : boolean = true;
  activeMenu : string = 'Burger';
  products : Product[] = [];
  productsInCart : Product[] = [];
  selectedPopularProducts : any[] = [];
  cartTotal : number = 0;
  productPrice : number = 0;

  cartService : CartService = inject(CartService);
  posManagement : PosManagementService = inject(PosManagementService);
  @ViewChild('outputPanel') outputPanel : ElementRef | undefined;
  @ViewChild('doc') doc : HTMLInputElement | undefined;

  ngOnInit(): void {

    this.products = this.cartService.getProducts();
    this.cartService.getSelectedPopular('Burgers');
    this.cartService.filteredProdsSub.subscribe((products)=>{
      this.selectedPopularProducts =  products;
    })
    this.cartService.productsInCart.subscribe((products)=>{
      this.productsInCart = products;
    })
    this.cartService.cartTotalSubject.subscribe((total)=>{
      this.cartTotal = total;
    })
    this.cartService.productPriceSubject.subscribe((price)=>{
      this.productPrice = price;
    })
    this.posManagement.modeSubject.subscribe((value)=>{
      this.isPOSMode = value;
    })
  }
  
  AddToCart(id : string){
    this.cartService.addToCart(id);
    this.outputPanel?.nativeElement.scrollBy({top : window.innerHeight, behavior: 'smooth'})
  }
  

  TogglePanel(){
    if(this.isPanelExpanded){
      this.activeMenu = 'Burger';
    }
    else{
      this.activeMenu = '';
    }
    this.isPanelExpanded = !this.isPanelExpanded;
    this.cartService.getSelectedPopular('Burgers');
  }
  ToggleMode(){
    this.isSearchMode = !this.isSearchMode;
    this.isPanelExpanded = true;
    this.activeMenu = '';
    this.cartService.getSelectedPopular('Burgers');
  }
  ActivateMenuItem(menuItem : string){
    this.cartService.getSelectedPopular(menuItem+'s');
    if (this.isPanelExpanded)
      this.isPanelExpanded = !this.isPanelExpanded;
    
    switch(menuItem){
      case 'Pizza':
      this.activeMenu = 'Pizza';
      
      break;
      case 'Burger':
      this.activeMenu = 'Burger';
      break;
      case 'Meal':
      this.activeMenu = 'Meal';
      break;
      case 'Drink':
      this.activeMenu = 'Drink';
      break;
      default:
        this.activeMenu = '';
    }
  }
}
