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
  isPOSMode : boolean = true;
  activeMenu : string = '';
  cartService : CartService = inject(CartService);
  products : any[] = [];
  selectedPopularProducts : any[] = [];

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    this.cartService.getSelectedPopular('Burgers');
    this.cartService.filteredProdsSub.subscribe((products)=>{
      this.selectedPopularProducts =  products;
      console.log(this.selectedPopularProducts)

    })
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
