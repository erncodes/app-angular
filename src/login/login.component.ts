import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/services/auth-.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginMode : boolean = true;
  isCashier : boolean = false;
  authService : AuthService = inject(AuthService);
  notificationService : NotificationService = inject(NotificationService);

  SwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  OnFormSubmitted(form : NgForm){
    this.notificationService.ShowInfoNotification("Form Submitted");
    const email = form.value.email;
    const password = form.value.password;
    if(this.isLoginMode){
      return
    }
    else{
      this.authService.SignUp(email,password).subscribe({
        next : (res) =>{console.log(res)},
        error : (error) => { console.log(error)}
      });
    }

  }
}
