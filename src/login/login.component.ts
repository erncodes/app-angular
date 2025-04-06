import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/models/authResponse';
import { LoggedInUser } from 'src/models/loggedInUser';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth-.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    this.authService.loggedUserSubject.subscribe({
      next : (user) =>{ this.loggedUser = user},
      error: (err) =>{ console.log(err)}
    })
  }
  isLoginMode : boolean = true;
  loggedUser : LoggedInUser | undefined = undefined;

  router : Router = inject(Router);
  authService : AuthService = inject(AuthService);
  authObs : Observable<AuthResponse> = new Observable<AuthResponse>;
  notificationService : NotificationService = inject(NotificationService);

  SwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  OnFormSubmitted(form : NgForm){
    const email = form.value.email;
    const password = form.value.password;
    if(!email || !password){
      this.notificationService.ShowErrorNotification('Please Fill All Required Fields')
      return;
    }
    if(this.isLoginMode){
      this.authObs = this.authService.Login(email,password);
    }
    else{
      this.authObs = this.authService.SignUp(email,password)
    }
    this.authObs.subscribe({
      next : () =>{
        if(this.loggedUser?.user.roles.includes('admin')){
          this.router.navigate(['/PosManagement'])
        }
        else{
          this.router.navigate(['/PosTransact'])
        }
      },
      error : (error) => { this.notificationService.ShowErrorNotification(error.message)}
    });
    form.reset();
  }
}
