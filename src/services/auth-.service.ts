import { Injectable } from '@angular/core';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  GetAllUsers(filter? : string) : User[] | []{
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

  users : User[] = [
    { id : 11100, fullName : 'Josh Claude', roles : ['cashier'], email : 'joshclaude@dufty.com', gender : 'male'},
    { id : 11101, fullName : 'Emily Miles', roles : ['admin'], email : 'emilymiles@dufty.com', gender : 'female'},
    { id : 11102, fullName : 'Siya Banks', roles : ['admin'], email : 'siyabanks@dufty.com', gender : 'male'},
    { id : 11103, fullName : 'Amanda Sauls', roles : ['cashier'], email : 'amandasauls@dufty.com', gender : 'female'},
    { id : 11104, fullName : 'Katy Green', roles : ['cashier'], email : 'katygreen@dufty.com', gender : 'female'},
  ]
}
