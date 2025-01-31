import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth-.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  allUsers : any[]=[];
  authService : AuthService = inject(AuthService);
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
