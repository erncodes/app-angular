import { Component, inject, OnInit } from '@angular/core';
import { PosManagementService } from 'src/services/pos-management.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  posManagementService : PosManagementService = inject(PosManagementService);
  
  SwitchBackToMain(value : string){
    this.posManagementService.SwitchActivePanel(value);
  }
}
