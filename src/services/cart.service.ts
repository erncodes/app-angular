import { Injectable } from '@angular/core';
import { Product } from 'src/models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }
  filteredProdArray : any[] = [];
  filteredProdsSub : BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  getSelectedPopular(filterText? : string){
    if(filterText == ''){
      this.filteredProdArray = this.products.filter(prod => prod.rating > 4.5 && prod.category == 'Burgers');
      this.filteredProdsSub.next(this.filteredProdArray);
     return this.filteredProdArray;
    }
    else{
      this.filteredProdArray = this.products.filter(prod => prod.rating > 4.5 && prod.category == filterText);
      this.filteredProdsSub.next(this.filteredProdArray);
     return this.filteredProdArray;
    }
  }

  getProducts() : Product[] | []{
    return this.products;
  }

  products : Product[] = [
    {
      id : 160015,
      title : 'Chipolte Burger',
      description : 'Medium cheese burger',
      category : 'Burgers',
      size : 'medium',
      imageUrl : '../assets/images/burger_images/Chipolte-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 62.99,
      discount : 0,
      rating : 4
    },
    {
      id : 160016,
      title : 'Buffalo Chicken',
      description : 'Large chicken burger',
      category : 'Burgers',
      size : 'large',
      imageUrl : '../assets/images/burger_images/Buffalo-Chicken-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0,
      rating : 4.8
    },
    {
      id : 160017,
      title : 'Swiss Grilled Burger',
      description : 'Grilled mushroom burger',
      category : 'Burgers',
      size : 'medium',
      imageUrl : '../assets/images/burger_images/Grilled-Mushroom-Swiss-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 115.99,
      discount : 0,
      rating : 4.8
    },
    {
      id : 160018,
      title : 'Spicy Durbanite',
      description : 'Spicy Durban beef burger',
      category : 'Burgers',
      size : 'medium',
      imageUrl : '../assets/images/burger_images/Spicy-Durbanitte-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0,
      rating : 4.9
    },
    {
      id : 160019,
      title : 'Vegan Avocado Burger',
      description : 'Avocado burger',
      category : 'Burgers',
      size : 'large',
      imageUrl : '../assets/images/burger_images/Vegan-Avocado-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 123.99,
      discount : 0,
      rating : 4
    },
    {
      id : 160020,
      title : 'Spicy Chicken Burger',
      description : 'A spicy chicken burger',
      category : 'Burgers',
      size : 'medium',
      imageUrl : '../assets/images/burger_images/Spicy-Chicken-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 79.99,
      discount : 0,
      rating : 4.6
    },
    {
      id : 160021,
      title : 'Mexican Beef Burger',
      description : 'A beef burger',
      category : 'Burgers',
      size : 'mega',
      imageUrl : '../assets/images/burger_images/Beef-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0,
      rating : 4
    },
    {
      id : 160022,
      title : 'Avocado Burger',
      description : 'Avocado burger',
      category : 'Burgers',
      size : 'medium',
      imageUrl : '../assets/images/burger_images/Spicy-Chicken-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0,
      rating : 4
    },
    {
      id : 160023,
      title : 'Spicy Jalapeno',
      description : 'Spicy burger',
      category : 'Burgers',
      size : 'large',
      imageUrl : '../assets/images/burger_images/Spicy-Jalapeno-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 94.99,
      discount : 0,
      rating : 4.8
    },
    {
      id : 160024,
      title : 'Epic Burger',
      description : 'A cheese burger',
      category : 'Burgers',
      size : 'medium',
      imageUrl : '../assets/images/burger_images/Epic-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0,
      rating : 4
    },
    {
      id : 160025,
      title : 'Mc Chicken Burger',
      description : 'A chicken burger',
      category : 'Burgers',
      size : 'small',
      imageUrl : '../assets/burger_images/Chicken-Burger-McDonalds.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 52.99,
      discount : 0,
      rating : 4
    },





    //pizza
    {
      id : 160030,
      title : 'BBQ Chicken Pizza',
      description : 'A BBQ pizza',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/BBQ-Chicken-Pizza.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 115.99,
      discount : 0,
      rating : 4.8
    },
    {
      id : 160031,
      title : 'Pepperoni Pizza (black olives)',
      description : 'Black-Olives Pepperoni Pizza',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/Black-Olives-and-Pepperoni.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 122.99,
      discount : 0,
      rating : 4.7
    },
    {
      id : 160032,
      title : 'Chicken Sausage Pizza',
      description : 'A chicken sausage pizza with onions and peppers.',
      category : 'Pizzas',
      size : 'small',
      imageUrl : '../assets/images/pizza_images/Chicken-Sausage-Pizza-with-Onions-and-Peppers.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 52.99,
      discount : 0,
      rating : 4
    },
    {
      id : 160033,
      title : 'Greek Pizza',
      description : 'Greek pizza.',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/Greek-Pizza.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 95.99,
      discount : 0,
      rating : 4.6
    },
    {
      id : 160034,
      title : 'Grilled Pizza',
      description : 'Grilled pizza with red onions and feta.',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/Grilled-Pizza-With-Grilled-Red-Onions-and-Feta.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 105.99,
      discount : 0,
      rating : 4.6
    },
    {
      id : 160035,
      title : 'Olive Pizza',
      description : 'Olive pizza with red onions.',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/Olive-Pizza-with-Red-Onions.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 52.99,
      discount : 0,
      rating : 4
    },
    {
      id : 160036,
      title : 'Pepperoni Classic',
      description : 'A pepperoni pizza',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/Pepperoni-Pizza.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 102.99,
      discount : 0,
      rating : 4.7
    },
    {
      id : 160037,
      title : 'Avocado Pizza',
      description : 'An avocado pizza',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/Pizzas-avacados.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 92.99,
      discount : 0,
      rating : 4
    },
    {
      id : 160038,
      title : 'Sausage Pizza',
      description : 'Sausage Pizza',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/Sausage-Pizza-with-BBQ-Sauce.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 89.99,
      discount : 0,
      rating : 4
    },
    {
      id : 160039,
      title : 'Smoked Sausage Pizza',
      description : 'Smoked sausage pizza.',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/Smoked-Sausage-Pizza.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 95.99,
      discount : 0,
      rating : 4.9
    },
    {
      id : 160040,
      title : 'Spare Rib Pizza',
      description : 'Spare rib pizza',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/pizza_images/Spare-Rib-Pizza.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 135.99,
      discount : 0,
      rating : 4
    },
  ];
}
/*public id : number ,public title : string , public description : string,public category : string,
public brand : string | undefined , public size : string,
public imageUrl : string, public isInStock : boolean,public isInPromo : boolean, public leftInStock : number, 
public price : number, public discount : number | 0*/