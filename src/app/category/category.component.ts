import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/models/category';
import { CategoryService } from 'src/services/category.service';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  allCategories : Category[] = [];
    @Output() 
    toggler : EventEmitter<string> = new EventEmitter<string>()
    
  ngOnInit(): void {
    this.allCategories = this.categoryService.GetAllCategories();
  }
  posManagementService : PosManagementService = inject(PosManagementService);
  categoryService : CategoryService = inject(CategoryService);
  isModalOpen : boolean = false;
    
  @ViewChild('form')
        form: NgForm | undefined;
  
  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
  ToggleModal(){
    this.isModalOpen = !this.isModalOpen;
  }
  EditCategory(category : Category){
    this.toggler.emit('EditCategory');
  }
  FormSubmit(){}
}
