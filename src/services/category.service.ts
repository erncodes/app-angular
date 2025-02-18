import { Injectable } from '@angular/core';
import { Category } from 'src/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

     GetCategory(id : string) : Category | null{
      let category = this.categories.find(x => x.id == id);
      if(category)
        return category;
      return null;
     }
      EditCategory(){}
      CreateCategory(category : Category){}
      DeleteCategory(){}
      GetAllCategories() : Category[] | []{
        return this.categories;
      }

      categories : Category [] = [
        {id : 120100, categoryName : 'Pizza', description : 'Category for pizzas',totalProducts : 0},
        {id : 120101, categoryName : 'Burger', description : 'Category for burgers',totalProducts : 0},
        {id : 120102, categoryName : 'Meal', description : 'Category for meals',totalProducts : 0},
        {id : 120103, categoryName : 'Drink', description : 'Category for drinks',totalProducts : 0},
      ]
}
