import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PosManagementComponent } from './pos-management/pos-management.component';
import { PosTransactComponent } from './pos-transact/pos-transact.component';

const routes : Routes = [
  { path : '', component : AppComponent},
  { path : 'Home', component : AppComponent},
  { path : 'PosManagement', component : PosManagementComponent},
  { path : 'PosTransact', component : PosTransactComponent},
  {path : '**', component : AppComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
