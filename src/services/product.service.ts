import { Injectable } from '@angular/core';
import { Product } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  GetProduct(short_barcode : string) : Product | null{
    let product = this.products.find(c => c.short_barcode == +short_barcode);
    if(product)
      return product;
    return null;

    /**this.httpClient.get<{[key : string] : Product}>('https://urbanstrides-640e5-default-rtdb.europe-west1.firebasedatabase.app/products/'+short_barcode+'.json')
    .pipe(map((response)=>{
      let prod = {};
      prod = {...response, short_barcode : short_barcode};
      return prod;
    })).subscribe((product)=>{
      this.productClicked.next(product);
    }
    ) */
  }
  EditProduct(){}
  CreateProduct(product : Product){}
  DeleteProduct(){}
  GetAllProducts(filter? : string) : Product[] | []{
    let filtered_products = this.products;
    if(filter){
      switch(filter){
        case 'burgers':
          filtered_products = this.products.filter(x => x.category.toLocaleLowerCase() === 'burgers');
          break;
        case 'meals':
          filtered_products = this.products.filter(x => x.category.toLocaleLowerCase() === 'meals');
          break;
        case 'pizzas':
          filtered_products = this.products.filter(x => x.category.toLocaleLowerCase() === 'pizzas');
          break;
        case 'drinks':
          filtered_products = this.products.filter(x => x.category.toLocaleLowerCase() === 'drinks');
          break;
        default:
          filtered_products = this.products;
          break;
      }
      return filtered_products;
    }
    return this.products;

    /**   let headers = new HttpHeaders();
     headers = headers.set('Access-Control-Allow-Origin','*');
    this.httpClient.get<{ [key : string] : Product}>('https://urbanstrides-640e5-default-rtdb.europe-west1.firebasedatabase.app/products.json',{headers : headers})
      .pipe(map((data)=>{
      let items = [];
      for(let key in data){
        if(data.hasOwnProperty(key))
        {
          items.push({...data[key],short_barcode : key})
        }
      }
      return items;
    })).subscribe((products)=>{
      this.products = products;
      this.filteredProdsSub.next(this.GetProductsFiltered());
      this.productSearchSub.next(this.GetProductsFiltered());
    }); */
  }

  products : Product[] = [
    {
      short_barcode : 160015,
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
      short_barcode : 160016,
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
      short_barcode : 160017,
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
      short_barcode : 160018,
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
      short_barcode : 160019,
      title : 'Vegan Avocado',
      description : 'Avocado burger',
      category : 'Burgers',
      size : 'large',
      imageUrl : '../assets/images/burger_images/Vegan-Avocado-Burger.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 123.99,
      discount : 0,
      rating : 4.6
    },
    {
      short_barcode : 160020,
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
      short_barcode : 160021,
      title : 'Mexican Beef Burger',
      description : 'A beef burger',
      category : 'Burgers',
      size : 'mega',
      imageUrl : '../assets/images/burger_images/Mexican.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 82.99,
      discount : 0,
      rating : 4.8
    },
    {
      short_barcode : 160022,
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
      short_barcode : 160023,
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
      short_barcode : 160024,
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
      short_barcode : 160025,
      title : 'Mc Chicken Burger',
      description : 'A chicken burger',
      category : 'Burgers',
      size : 'small',
      imageUrl : '../assets/images/burger_images/Chicken-Burger-Mcdonalds.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 52.99,
      discount : 0,
      rating : 4.9
    },





    //pizza
    {
      short_barcode : 160030,
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
      short_barcode : 160031,
      title : 'Pepperoni Pizza',
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
      short_barcode : 160032,
      title : 'Chicken Sausage',
      description : 'A chicken sausage pizza with onions and peppers.',
      category : 'Pizzas',
      size : 'small',
      imageUrl : '../assets/images/pizza_images/Chicken-Sausage-Pizza-with-Onions-and-Peppers.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 52.99,
      discount : 0,
      rating : 4.7
    },
    {
      short_barcode : 160033,
      title : 'Greek Spicy Pizza',
      description : 'Spicy Greek pizza.',
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
      short_barcode : 160034,
      title : 'Grilled Onion Pizza',
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
      short_barcode : 160035,
      title : 'Epic Olive Pizza',
      description : 'Olive pizza with red onions.',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/Olive-Pizza-with-Red-Onions.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 52.99,
      discount : 0,
      rating : 4.8
    },
    {
      short_barcode : 160036,
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
      short_barcode : 160037,
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
      short_barcode : 160038,
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
      short_barcode : 160039,
      title : 'Smoked Sausage',
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
      short_barcode : 160040,
      title : 'Spare Rib Pizza',
      description : 'Spare rib pizza',
      category : 'Pizzas',
      size : 'large',
      imageUrl : '../assets/images/pizza_images/Spare-Rib-Pizza.jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 135.99,
      discount : 0,
      rating : 4
    },




    //meals
    {
      short_barcode : 160050,
      title : 'Meal-1',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (1).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 56.99,
      discount : 0,
      rating : 4.7
    },
    {
      short_barcode : 160051,
      title : 'Meal-2',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (2).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 56.99,
      discount : 0,
      rating : 4.6
    },
    {
      short_barcode : 160052,
      title : 'Meal-3',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (3).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 56.99,
      discount : 0,
      rating : 4.9
    },
    {
      short_barcode : 160053,
      title : 'Meal-4',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (4).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 64.99,
      discount : 0,
      rating : 4.8
    },
    {
      short_barcode : 160054,
      title : 'Meal-5',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (5).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 72.99,
      discount : 0,
      rating : 4.6
    },
    {
      short_barcode : 160055,
      title : 'Meal-6',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (6).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 56.99,
      discount : 0,
      rating : 4.8
    },
    {
      short_barcode : 160056,
      title : 'Meal-7',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (7).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 95.99,
      discount : 0,
      rating : 4.9
    },
    {
      short_barcode : 160057,
      title : 'Meal-8',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (8).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 66.99,
      discount : 0,
      rating : 4.8
    },
    {
      short_barcode : 160058,
      title : 'Meal-9',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (9).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 56.99,
      discount : 0,
      rating : 4
    },
    {
      short_barcode : 160059,
      title : 'Meal-10',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (9).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 56.99,
      discount : 0,
      rating : 4
    },
    {
      short_barcode : 160060,
      title : 'Meal-6',
      description : 'Meals description here.',
      category : 'Meals',
      size : '',
      imageUrl : '../assets/images/meals_images/Meal (6).jpg',
      isInStock : true,
      isInPromo : false,
      leftInStock : 30,
      price : 56.99,
      discount : 0,
      rating : 4
    },
  ];
}
