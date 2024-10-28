import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../stores/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  @Input() username: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  logout(): void {
    alert('Are you sure you want to logout?');
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
