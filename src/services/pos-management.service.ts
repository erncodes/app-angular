import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosManagementService {

  constructor() { }
  isPOSMode : boolean = false;
  modeSubject : Subject<boolean> = new Subject<boolean>();

  SwitchPOsMode(){
    this.isPOSMode = !this.isPOSMode;
    this.modeSubject.next(this.isPOSMode);
  }
}
