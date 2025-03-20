import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  users : User[] = [];
  userSubject : BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  httpClient : HttpClient = inject(HttpClient);

  GetAllUsers(filter? : string) : User[] | []{
     let headers = new HttpHeaders();
                headers = headers.set('Access-Control-Allow-Origin','*');
               this.httpClient.get<{ [key : string] : User}>('https://dufty-pos-default-rtdb.europe-west1.firebasedatabase.app/users.json',{headers : headers})
                 .pipe(map((data)=>{
                 let userArray = [];
                 for(let key in data){
                   if(data.hasOwnProperty(key))
                   {
                    userArray.push({...data[key],id : key})
                   }
                 }
                 return userArray;
               })).subscribe((users)=>{
                 this.users = users;
                 this.userSubject.next(this.users);
               });
    let filtered_users = this.users;
    if(filter){
      switch(filter){
        case 'male':
          filtered_users = filtered_users.filter(x => x.gender.toLocaleLowerCase() === 'male');
          break;
        case 'female':
          filtered_users = filtered_users.filter(x => x.gender.toLocaleLowerCase() === 'female');
          break;
        case 'admin':
          filtered_users = filtered_users.filter(x => x.roles.includes('admin'));
          break;
        case 'cashier':
          filtered_users = filtered_users.filter(x => x.roles.includes('cashier'));
          break;
        default:
          filtered_users = this.users;
          break;
      }
      return filtered_users;
    }
    return this.users;
  }
  GetSingleUser(id : number | string){}
  EditUser(id : number | string){}
  DeleteUser(id : number | string){}
}
