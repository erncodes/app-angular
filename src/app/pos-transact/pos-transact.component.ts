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
  change : number = 0;
  amount : number = 0;
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
    this.text = '';
  }
  VoidItem(barcode : string){
    const itemVoid = this.cartService.RemoveItem(barcode);
    if(itemVoid){
        setTimeout(()=>{
        this.inp.nativeElement.value = '';
        this.EndOperation()
        },2000);
      this.inp.nativeElement.value = "-"+ itemVoid.price;
      this.notificationService.ShowInfoNotification(itemVoid.title + ' Removed!');
    }
    else{
      this.notificationService.ShowErrorNotification('Item Not Found!');
    }
  }
  CheckItemPrice(barcode : string){
    this.productService.GetProduct(barcode);
    this.TogglePriceModal();
  }
  FinaliseSale(input : string){
    if(this.loggedUser){
      if(+input < this.cartTotal){
        this.cartTotal -= +input;
        this.posMode = 'Final';
      }else{
        this.change = +this.cartTotal - +input;
        const sale = new Sale(this.loggedUser.user.fullName,new Date(),this.productsInCart,this.cartTotal,+this.change.toFixed(2));
        this.cartService.FinalizeSale(sale);
        this.inp.nativeElement.value = this.change.toFixed(2);
        this.text = 'Change';
        this.posMode = 'Ready';
      }

    }

  }
  AddToCart(barcode : string){
    let item = this.cartService.addToCart(barcode);
    if(item){
      setTimeout(()=>{
      this.inp.nativeElement.value = '';
      },2000);
      this.inp.nativeElement.value = item.price;
    }
    else{
      this.notificationService.ShowErrorNotification('Product not found. Please check your barcode!')
    }
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
    this.posMode = "Subtotal";
    this.inp.nativeElement.value = "";
    if(this.isPanelExpanded){
      this.text = "Total : " + this.cartTotal.toFixed(2);
    }
    else{
      this.text = "Total";
    }
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
        case ' ' :
          this.TogglePanel();
          break;
          case '+':
            this.SubTotalMode()
          break;
          case '-':
            if(this.posMode == 'Subtotal'){
              this.posMode = "Finalising";
              this.text = "Change";
            }
            else{
              this.inp.nativeElement.value = this.cartTotal.toFixed(2);
              this.notificationService.ShowErrorNotification('Please Enter Subtotal to finalize');
            }
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
            else if(this.posMode == 'Subtotal'){
              this.FinaliseSale(this.inp.nativeElement.value);
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
    this.posMode = 'Ready';
    this.text = '';
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