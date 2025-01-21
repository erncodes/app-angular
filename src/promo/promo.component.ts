import { Component, inject } from '@angular/core';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent {
  posManagementService : PosManagementService = inject(PosManagementService);

  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
}
