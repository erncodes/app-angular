import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth-.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  allUsers : User[]=[];
  authService : AuthService = inject(AuthService);

  isModalOpen : boolean = false;
  
  @ViewChild('form')
      form: NgForm | undefined;
  
  ngOnInit(): void {
    this.allUsers =  this.authService.GetAllUsers();
  }
  ToggleModal(){
    this.isModalOpen = !this.isModalOpen;
  }
  EditUser(user : User){
  }
  FilterUsers(value? : string){
    if(value)
     this.allUsers = this.authService.GetAllUsers(value);
    else
    this.allUsers = this.authService.GetAllUsers();
  }
  FormSubmit(){}
}
