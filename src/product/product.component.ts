import { Component, inject } from '@angular/core';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  posManagementService : PosManagementService = inject(PosManagementService);

  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
}
