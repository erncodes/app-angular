import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/models/product';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-pos-transact',
  templateUrl: './pos-transact.component.html',
  styleUrls: ['./pos-transact.component.css']
})
export class PosTransactComponent implements OnInit{
  isPanelExpanded : boolean = false;
  isSearchMode : boolean = false;
  activeMenu : string = 'Burger';
  showModal : boolean = false;
  posMode : string = '';
  productsInCart : Product[] = [];
 
  cartTotal : number = 0;
  productPrice : number | string = '';

  cartService : CartService = inject(CartService);
  router : Router = inject(Router);
  @ViewChild('outputPanel') outputPanel : ElementRef | undefined;
  @ViewChild('inp') inp : ElementRef | undefined;
  text : string = "";
  ngOnInit(): void {

    this.cartService.cartTotalSubject.subscribe((total)=>{
      this.cartTotal = total;
      this.outputPanel?.nativeElement.scrollBy({top : window.innerHeight, behavior: 'smooth'})
    })
    this.cartService.productPriceSubject.subscribe((price)=>{
      this.productPrice = price;
    })
    this.cartService.productsInCart.subscribe((items)=>{
      this.productsInCart =items;
    })
    this.WaitForInput()
  }
  ClearCart(){
    this.cartService.clearCart();
  }
  WaitForInput(){
    let body = document.getElementsByTagName("body");
    body[0].focus()
    body[0].addEventListener('keyup',(e)=>{
      if (this.inp)
        this.inp.nativeElement.focus();
       
      switch(e.key){
        case 'r' :
        case 'R' :
          this.text = "Read";
          this.showModal = true;
          break;
          case '+':
            this.text = "Total";
          break;
          case 'Escape':
            this.text = "";
            this.showModal = false;
          break;
          case 'Enter':
            this.text = "";
          break;
          default:
            console.log(e.key)
      }
    })
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
  
  SignOut(){
    this.router.navigate(['/']);
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
  OnEnter(){
    switch(this.posMode){
      case '':
        break;
      case '':
        break;
      case '':
        break;
    }
  }
}