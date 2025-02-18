import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductCategory } from 'src/models/category';
import { CategoryService } from 'src/services/category.service';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  allCategories : ProductCategory[] = [];
  formMode : string = 'Add';
    
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
  ToggleModal(id? : string){
    this.isModalOpen = !this.isModalOpen;
    if(id){
      let category = this.categoryService.GetCategory(id);
      this.formMode = 'Edit';
      if(category && this.form){
        this.form.setValue({
          name_El : category.categoryName,
          description : category.description,
        })
      }
      

    }
    else{
      this.formMode = 'Add';
      this.form?.resetForm()
    }
  }
  FormSubmit(){}
}
