import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../stores/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutAlertComponent } from '../logout-alert/logout-alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() username: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  logout(): void {
    const dialogRef = this.dialog.open(LogoutAlertComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // If the user confirmed to logout
        this.authService.logout();
        this.router.navigate(['/']);
      }
    });
  }
}







// import { Component, Input } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../stores/auth.service';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './nav-bar.component.html',
//   styleUrls: ['./nav-bar.component.css']
// })
// export class NavBarComponent {
//   @Input() username: string = '';

//   constructor(private router: Router, private authService: AuthService) {}

//   logout(): void {
//     alert('Are you sure you want to logout?');
//     this.authService.logout();
//     this.router.navigate(['/']);
//   }

// }