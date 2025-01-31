import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  GetAllUsers(){}
  GetSingleUser(id : number | string){}
  EditUser(id : number | string){}
  DeleteUser(id : number | string){}
}
