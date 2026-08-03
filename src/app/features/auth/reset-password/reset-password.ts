import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PasswordField } from '../../../shared/password-field/password-field';
import { AuthApi } from '../../../@api/auth/auth.api';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    PasswordField,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  hide = signal(true);

  private authApi = inject(AuthApi);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private verificationToken: string = '';

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/),
    ]),
  });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.verificationToken = params['token'] || '';
    });
  }

  onsubmit() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    // if (this.resetPasswordForm.value.password !== this.resetPasswordForm.value.confirmPassword) {
    //   alert('password do not match');
    //   return;
    // }

    this.authApi
      .resetPassword({
        verificationToken: this.verificationToken,
        password: this.resetPasswordForm.value.password!,
      })
      .subscribe({
        next: (response) => {
          this.router.navigate(['signIn']);
        },
      });
  }
}
