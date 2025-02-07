import { Component, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.allUsers =  this.authService.GetAllUsers();
  }

}
