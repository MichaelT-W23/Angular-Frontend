import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthService } from './stores/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular-Frontend';
  userName: string = 'Guest';
  showNavBar: boolean = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to router events and filter for NavigationEnd
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showNavBar = !['/', '/Register'].includes(event.urlAfterRedirects);
      });

    // Subscribe to AuthService's user$ observable to get updates
    this.authService.user$.subscribe(user => {
      this.userName = user.username || '';
    });
  }
}
