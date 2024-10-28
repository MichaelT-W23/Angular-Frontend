import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../stores/auth.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  async handleRegister() {
    try {
      const userData = { username: this.name, email: this.email, password: this.password };
      const response = await firstValueFrom(this.userService.createNewUser(userData));

      if (response && response.user) {
        const loginResponse = await this.authService.login(response);

        if (loginResponse && loginResponse.user) {
          this.authService.logout();
          this.router.navigate(['/Dashboard']);
        } else {
          this.errorMessage = "Failed to log in after registration";
        }
      } else {
        this.errorMessage = response.error || "Registration failed";
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = "An error occurred during registration";
    }
  }
}
