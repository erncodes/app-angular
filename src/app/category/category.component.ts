import { Component, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '@syncfusion/ej2-angular-charts';
import { ProductCategory } from 'src/models/category';
import { CategoryService } from 'src/services/category.service';
import { NotificationService } from 'src/services/notification.service';
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
    this.categoryService.categorySubject.subscribe((categories) =>{
      this.allCategories = categories;
    })
  }
  posManagementService : PosManagementService = inject(PosManagementService);
  categoryService : CategoryService = inject(CategoryService);
  notificationService : NotificationService = inject(NotificationService);
  
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
  FormSubmit(form : NgForm){
    if(form.valid){
      const newCategory = new ProductCategory(form.value.name_El,form.value.description);
      this.categoryService.CreateCategory(newCategory);
    }
    else{
      this.notificationService.ShowErrorNotification('Please fill all fields.')
    }
  }
}
