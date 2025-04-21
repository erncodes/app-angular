import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Subject, tap, throwError } from 'rxjs';
import { AuthResponse } from 'src/models/authResponse';
import { LoggedInUser } from 'src/models/loggedInUser';
import { User } from 'src/models/user';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  users : any[] = [];
  use : User[] = [];
  private tokenEndTimer : any;
  loggedUserSubject : BehaviorSubject<LoggedInUser> = new BehaviorSubject<LoggedInUser>(null);
  userSubject : BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  httpClient : HttpClient = inject(HttpClient);
  router : Router = inject(Router);
  notificationService : NotificationService = inject(NotificationService);

  SignUp(email : string,password : string){
    const data = {email : email,password : password, returnSecureToken : true};
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin','*');
    return this.httpClient.post<AuthResponse>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3FWA9y0cah9M6hLirGmYr8lIpF6IMOmk',data).
    pipe(catchError(this.HandleError), tap((res)=>{
      this.HandleSignIn(res);
    }));
  }
  Login(email : string,password : string){
    const data = {email : email,password : password, returnSecureToken : true};
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin','*');
    return this.httpClient.post<AuthResponse>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3FWA9y0cah9M6hLirGmYr8lIpF6IMOmk',data).
    pipe(catchError(this.HandleError), tap((res)=>{
      this.HandleSignIn(res);
    }))
  }
  AutoLogin(){
    let userInStorage = JSON.parse(localStorage.getItem('user'));
    if(!userInStorage){
      return;
    }
    const user = new User(userInStorage.user.fullName,userInStorage.user.roles,userInStorage.user.email,userInStorage.user.gender,userInStorage.user.id);
    const loggedUser = new LoggedInUser(user,userInStorage._token,userInStorage.expiresIn);
    if(loggedUser.token){
      this.loggedUserSubject.next(loggedUser);
      const timer = (new Date(loggedUser.expiresIn)).getTime() - new Date().getTime();
      this.AutoLogOut(timer)
    }
  }
  LogOut(){
    this.loggedUserSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    if(this.tokenEndTimer){
      clearTimeout(this.tokenEndTimer)
    }
    this.tokenEndTimer = null;
  }
  AutoLogOut(tokenExpiry){
    this.tokenEndTimer = setTimeout(()=>{
      this.LogOut();
    },tokenExpiry)
  }
  HandleError(err : any){
    let errorMsg = 'An Unknown error has occured.';
    if(!err.error || !err.error.error){
      this.notificationService.ShowErrorNotification(errorMsg)
      return throwError(()=> new Error(errorMsg));
    }
    switch (err.error.error.message){
      case 'EMAIL_EXISTS':
        errorMsg = 'This email is already taken.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMsg = 'This action is not allowed.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMsg = 'Email or password is incorrect.';
        break;
    }
      this.notificationService.ShowErrorNotification(errorMsg)
      return throwError(()=> new Error(errorMsg));
  }
  
  HandleSignIn(res : AuthResponse){
    this.GetAllUsers();
    this.use = this.users;
    var existingUser = this.use.find(x=> x.email.toLowerCase() == res.email.toLowerCase());
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    if(existingUser){
      const user = new User(existingUser.fullName,existingUser.roles,res.email,existingUser.gender,res.localId);
      const loggedUser = new LoggedInUser(user,res.idToken,expiresIn);
      this.loggedUserSubject.next(loggedUser);
      this.AutoLogOut(+res.expiresIn * 1000);
      this.notificationService.ShowSuccessNotification("Sign-In Successful.");
      localStorage.setItem('user',JSON.stringify(loggedUser));
    }
    else{
      this.notificationService.ShowInfoNotification("User Account Not Initialized.")
    }
  }
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

  CreateAppUser(user : User){
    this.httpClient.post('https://dufty-pos-default-rtdb.europe-west1.firebasedatabase.app/users',user).subscribe({
      next: (res)=>{this.notificationService.ShowInfoNotification('User Added' + res)},
      error:(err)=>{this.notificationService.ShowErrorNotification(err.message)}
    })
  }
  EditUser(id : number | string){}
}
