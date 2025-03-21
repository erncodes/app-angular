import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  snackBar : MatSnackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ShowSuccessNotification(message : string){
    this.snackBar.open(message,"X",
      {
        duration :2000,  
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['custom-snackbar', 'snackbar-success'],
      });
  }

  ShowErrorNotification(error : string){
    this.snackBar.open(error,"X",
      {
        duration :2000,  
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['custom-snackbar', 'snackbar-error'],
      });
  }
  ShowInfoNotification(info : string){
    this.snackBar.open(info,"X",
      {
        duration :2000,  
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['custom-snackbar', 'snackbar-info'],
      });
  }
}
