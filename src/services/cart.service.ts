import { Injectable } from '@angular/core';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  getProducts() : Product[] | []{
    return this.products;
  }

  products : Product[] = [
    {
      id : 160015,
      title : 'Mexican Cheese Burger',
      description : 'Medium Mexican cheese burger',
      category : 'Burgers',
      size : 'Medium',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 62.99,
      discount : 0
    },
    {
      id : 160016,
      title : 'Mexican Cheese Burger',
      description : 'Large Mexican cheese burger',
      category : 'Burgers',
      size : 'Large',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0
    },
    {
      id : 160017,
      title : 'Mexy Cheese Burger',
      description : 'Extra large Mexican cheese burger',
      category : 'Burgers',
      size : 'Mega',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 115.99,
      discount : 0
    },
    {
      id : 160018,
      title : 'Spicy Durbanite Burger',
      description : 'Spicy Durban beef burger',
      category : 'Burgers',
      size : 'medium',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0
    },
    {
      id : 160019,
      title : 'Spicy Durbanite Max',
      description : 'Large Durbanite beef burger',
      category : 'Burgers',
      size : 'Large',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 123.99,
      discount : 0
    },
    {
      id : 160020,
      title : 'Mc Cheese Burger',
      description : 'A cheese burger',
      category : 'Burgers',
      size : 'Mega',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0
    },
    {
      id : 160021,
      title : 'Mc Cheese Burger',
      description : 'A cheese burger',
      category : 'Burgers',
      size : 'Mega',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0
    },
    {
      id : 160022,
      title : 'Mc Cheese Burger',
      description : 'A cheese burger',
      category : 'Burgers',
      size : 'Mega',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0
    },
    {
      id : 160023,
      title : 'Mc Cheese Burger',
      description : 'A cheese burger',
      category : 'Burgers',
      size : 'Mega',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0
    },
    {
      id : 160024,
      title : 'Mc Cheese Burger',
      description : 'A cheese burger',
      category : 'Burgers',
      size : 'Mega',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0
    },
    {
      id : 160025,
      title : 'Mc Cheese Burger',
      description : 'A cheese burger',
      category : 'Burgers',
      size : 'Mega',
      imageUrl : '../assets/images/1.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0
    },
  ];
}
/*public id : number ,public title : string , public description : string,public category : string,
public brand : string | undefined , public size : string,
public imageUrl : string, public isInStock : boolean,public isInPromo : boolean, public leftInStock : number, 
public price : number, public discount : number | 0*/