import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout-alert',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './logout-alert.component.html'
})
export class LogoutAlertComponent {
  
  constructor(private dialogRef: MatDialogRef<LogoutAlertComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false); 
  }

  onLogout(): void {
    this.dialogRef.close(true);
  }

}
