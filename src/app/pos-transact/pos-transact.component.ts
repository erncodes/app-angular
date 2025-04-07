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
    this.inp.nativeElement.value = 0;
  }
  VoidItem(barcode : string){
    const itemVoid = this.cartService.RemoveItem(barcode);
    if(itemVoid){
      this.notificationService.ShowInfoNotification(itemVoid.title + ' Removed!');
      this.EndOperation()
    }
  }
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
  SwitchToRead(){
    this.text = "Read"; 
    this.posMode = 'Read';
    this.inp.nativeElement.value = '';
  }
  SwitchToVoid(){
    this.text = "Void"; 
    this.posMode = 'Void';
    this.inp.nativeElement.value = '';
  }
  EndOperation(){
    this.text = "";
    this.posMode = 'Ready';
    this.inp.nativeElement.value = '';
    this.showPriceModal = false;
  }
  SubTotalMode(){
    this.posMode = "SubTotal";
    this.text = "Total";
    this.inp.nativeElement.value = this.cartTotal;
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
          this.SwitchToRead()
          break;
        case 'v' :
        case 'V' :
          this.SwitchToVoid()
          break;
          case '+':
            this.SubTotalMode()
          break;
          case '-':
            this.posMode = "Finalising";
            this.text = "Change";
          break;
          case 'insert':
            this.showModal = true;
          break;
          case 'Escape':
          case 'End':
              this.EndOperation()
          break;
          case 'Enter':
            if(this.posMode == 'Read'){
              this.CheckItemPrice(this.inp.nativeElement.value)
            }
            else if(this.posMode == 'Void'){
              this.VoidItem(this.inp.nativeElement.value)
            }
            else{
              this.AddToCart(this.inp.nativeElement.value)
            }
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
}