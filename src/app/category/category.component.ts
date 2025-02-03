import { Component, inject, OnInit } from '@angular/core';
import { Category } from 'src/models/category';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  allCategories : Category[] = [];
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  posManagementService : PosManagementService = inject(PosManagementService);
  
  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }

}
