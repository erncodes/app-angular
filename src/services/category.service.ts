import { Injectable } from '@angular/core';
import { ProductCategory } from 'src/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

     GetCategory(id : string) : ProductCategory | null{
      let category = this.categories.find(x => x.id == id);
      if(category)
        return category;
      return null;
     }
      EditCategory(){}
      CreateCategory(category : ProductCategory){}
      DeleteCategory(){}
      GetAllCategories() : ProductCategory[] | []{
        return this.categories;
      }

      categories : ProductCategory [] = [
        {id : 120100, categoryName : 'Pizza', description : 'Category for pizzas',totalProducts : 0},
        {id : 120101, categoryName : 'Burger', description : 'Category for burgers',totalProducts : 0},
        {id : 120102, categoryName : 'Meal', description : 'Category for meals',totalProducts : 0},
        {id : 120103, categoryName : 'Drink', description : 'Category for drinks',totalProducts : 0},
      ]
}
