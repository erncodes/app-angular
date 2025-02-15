import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
  @Output() 
  toggler : EventEmitter<string> = new EventEmitter<string>()
  
  ngOnInit(): void {
    this.allUsers =  this.authService.GetAllUsers();
  }
  Toggle(){
    this.toggler.emit('User');
  }
  EditUser(user : User){
    this.toggler.emit('EditUser');
  }
}
