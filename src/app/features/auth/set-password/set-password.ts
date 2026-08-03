import { Component, inject, signal } from '@angular/core';
import { AuthApi } from '../../../@api/auth/auth.api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { PasswordField } from '../../../shared/password-field/password-field';
import { MatInputModule } from '@angular/material/input';
import { ClerkApi } from '../../../@api/clerks/clerk.api';

@Component({
  selector: 'app-set-password',
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
  templateUrl: './set-password.html',
  styleUrl: './set-password.css',
})
export class SetPassword {
  hide = signal(true);

  private clerkApi = inject(ClerkApi);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private setPasswordToken: string = '';

  setPasswordForm = new FormGroup({
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
      this.setPasswordToken = params['token'] || '';
    });
  }

  onsubmit() {
    if (this.setPasswordForm.invalid) {
      this.setPasswordForm.markAllAsTouched();
      return;
    }

    this.clerkApi
      .setPassword({
        setPasswordToken: this.setPasswordToken,
        password: this.setPasswordForm.value.password!,
      })
      .subscribe({
        next: (response) => {
          this.router.navigate(['signIn']);
        },
      });
  }
}
