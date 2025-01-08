import { Component,NgModule } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isPanelExpanded : boolean = false;
  activeMenu : string = '';

  TogglePanel(){
    this.isPanelExpanded = !this.isPanelExpanded;
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
