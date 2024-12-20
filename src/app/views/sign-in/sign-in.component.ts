import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../stores/auth.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], 
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private authStore: AuthService
  ) {}

  ngOnInit(): void {
    this.authStore.logout();
  }

  async handleSignIn(): Promise<void> {
    try {
      const userData = { username: this.username, password: this.password };
      const response = await firstValueFrom(this.userService.loginExistingUser(userData));

      if (response && response.user) {
        this.authStore.logout();
        this.authStore.login(response);
        this.router.navigate(['/Dashboard']);
      } else {
        this.errorMessage = "Invalid username or password";
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = "An error occurred during sign-in";
    }
  }

}

