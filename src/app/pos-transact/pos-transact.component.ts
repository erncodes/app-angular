import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInUser } from 'src/models/loggedInUser';
import { Product } from 'src/models/product';
import { Sale } from 'src/models/sale';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth-.service';
import { CartService } from 'src/services/cart.service';
import { NotificationService } from 'src/services/notification.service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-pos-transact',
  templateUrl: './pos-transact.component.html',
  styleUrls: ['./pos-transact.component.css']
})
export class PosTransactComponent implements OnInit{
  isPanelExpanded : boolean = true;
  isSearchMode : boolean = false;
  activeMenu : string = 'Burger';
  showModal : boolean = false;
  showPriceModal : boolean = false;
  posMode : string = 'Ready';
  productsInCart : Product[] = [];
  checkedProduct : Product;
 
  cartTotal : number = 0;
  productPrice : number | string = '';
  loggedUser : LoggedInUser | undefined = undefined;
  productService : ProductService = inject(ProductService);
  notificationService : NotificationService = inject(NotificationService);
  

  authService : AuthService = inject(AuthService);
  cartService : CartService = inject(CartService);
  router : Router = inject(Router);
  @ViewChild('outputPanel') outputPanel : ElementRef | undefined;
  @ViewChild('inp') inp : ElementRef | undefined;
  text : string = "";
  ngOnInit(): void {
    if(!this.isPanelExpanded)
      this.isPanelExpanded = true
    this.authService.loggedUserSubject.subscribe({
      next : (user) =>{ this.loggedUser = user},
      error: (err) =>{ this.notificationService.ShowErrorNotification(err.message)}
    })
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
    this.productService.checkedProductSub.subscribe((prod)=>{
      this.checkedProduct = prod;
    })
    this.WaitForInput()
  }
  ClearCart(){
    this.cartService.clearCart();
    this.notificationService.ShowInfoNotification("Cart Cleared!")
  }
  VoidItem(){}
  CheckItemPrice(barcode : string){
    this.productService.GetProduct(barcode);
    this.TogglePriceModal();
  }
  FinaliseSale(cartItems : Product[]){
    const sale = new Sale(this.loggedUser.user.fullName,new Date(),cartItems,cartItems.length);
    //this.cartService.Finalize(cartItems)
  }
  AddToCart(barcode : string){
    this.cartService.addToCart(barcode);
  }
  OverridePrice(barcode : string){}
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
          this.posMode = 'Read';
          if(!this.inp.nativeElement.value){
            this.showModal = true;
          }
          else{
            this.CheckItemPrice(this.inp.nativeElement.value.trim())
          }
          break;
          case '+':
            this.posMode = "SubTotal";
            this.text = "Total";
          break;
          case '-':
            this.posMode = "Finalising";
            this.text = "Change";
          break;
          case 'insert':
            this.showModal = true;
          break;
          case 'Escape':
            this.text = "";
            this.showModal = false;
          break;
          case 'Enter':
            this.CheckItemPrice(this.inp.nativeElement.value)
            
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
    this.authService.LogOut();
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
  TogglePriceModal(){
    this.showPriceModal = !this.showPriceModal;
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