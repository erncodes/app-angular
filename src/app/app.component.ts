import { Component,inject,NgModule, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isPanelExpanded : boolean = false;
  isSearchMode : boolean = false;
  activeMenu : string = '';
  cartService : CartService = inject(CartService);
  products : any[] = [];

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    console.log(this.products)
  }

  TogglePanel(){
    this.isPanelExpanded = !this.isPanelExpanded;
    this.activeMenu = '';
  }
  ToggleMode(){
    this.isSearchMode = !this.isSearchMode;
    this.isPanelExpanded = true;
    this.activeMenu = '';
  }
  ActivateMenuItem(menuItem : string){
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
