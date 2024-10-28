import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Import CommonModule here
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // if (this.signInForm.invalid) {
    //   return;
    // }

    this.userService.loginExistingUser(this.signInForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.successMessage = 'Logged in successfully!';
        this.errorMessage = null;
        this.signInForm.reset();
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = 'Login failed. Please try again.';
        this.successMessage = null;
      }
    });
  }
}
