import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-pos-management',
  templateUrl: './pos-management.component.html',
  styleUrls: ['./pos-management.component.css']
})
export class PosManagementComponent implements OnInit{

  posManagementService : PosManagementService = inject(PosManagementService);
  router : Router = inject(Router);
  activePanel : string = 'PosAnalytics';

  SwitchActivePanel(value : string){
    this.activePanel = value;
  }
  SignOut(){
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.posManagementService.activePanelSubject.subscribe((text)=>{
      this.activePanel = text;
    })
  }

}
