import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ProductCategory } from 'src/models/category';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  notificationService : NotificationService = inject(NotificationService);
  categories : ProductCategory[] = [];
  categorySubject : BehaviorSubject<ProductCategory[]> = new BehaviorSubject<ProductCategory[]>(this.categories);

    httpClient : HttpClient = inject(HttpClient)
     GetCategory(id : string) : ProductCategory | null{
      let category = this.categories.find(x => x.id == id);
      if(category)
        return category;
      return null;
     }
      EditCategory(){}
      CreateCategory(category : ProductCategory){
        this.httpClient.post('https://dufty-pos-default-rtdb.europe-west1.firebasedatabase.app/categories',category).subscribe({
          next: (res)=>{this.notificationService.ShowSuccessNotification('Category Added')},
          error:(err)=>{this.notificationService.ShowErrorNotification(err.message)}
        })
      }
      DeleteCategory(){}
      GetAllCategories(){
            let headers = new HttpHeaders();
            headers = headers.set('Access-Control-Allow-Origin','*');
           this.httpClient.get<{ [key : string] : ProductCategory}>('https://dufty-pos-default-rtdb.europe-west1.firebasedatabase.app/categories.json',{headers : headers})
             .pipe(map((data)=>{
             let catArray = [];
             for(let key in data){
               if(data.hasOwnProperty(key))
               {
                catArray.push({...data[key],id : key})
               }
             }
             return catArray;
           })).subscribe((categories)=>{
             this.categories = categories;
             this.categorySubject.next(this.categories);
           });
      }
}
