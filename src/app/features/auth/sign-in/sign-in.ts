import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { PasswordField } from '../../../shared/password-field/password-field';
import { EmailField } from '../../../shared/email-field/email-field';
import { AuthApi } from '../../../@api/auth/auth.api';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    PasswordField,
    EmailField,
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  hide = signal(true);
  private authApi = inject(AuthApi);
  private router = inject(Router);

  loading = false;
  errorMessage = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.authApi
      .login({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      })
      .subscribe({
        next: (response) => {
          this.loading = false;

          // console.log(response);

          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);

          const role = response.user.role;

          localStorage.setItem('role', role);

          if (role === 'user') {
            this.router.navigate(['/user-dashboard']);
          } else if (role === 'clerk') {
            this.router.navigate(['/clerk-homepage']);
          } else {
            this.router.navigate(['/admin-homepage']);
          }
          localStorage.getItem('accessToken');
          localStorage.getItem('refreshToken');
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Account is not registered. Please register first.';
        },
      });
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
