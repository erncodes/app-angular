import { Component, inject, OnInit } from '@angular/core';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-pos-management',
  templateUrl: './pos-management.component.html',
  styleUrls: ['./pos-management.component.css']
})
export class PosManagementComponent implements OnInit{

  posManagementService : PosManagementService = inject(PosManagementService);
  activePanel : string = 'ProductPanel';

  SwitchToPOS(){
    this.posManagementService.SwitchPOsMode();
  }
  SwitchActivePanel(value : string){
    this.activePanel = value;
  }
  ngOnInit(): void {
    this.posManagementService.activePanelSubject.subscribe((text)=>{
      this.activePanel = text;
    })
  }

}
