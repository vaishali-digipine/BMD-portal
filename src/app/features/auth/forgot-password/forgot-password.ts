import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { EmailField } from '../../../shared/email-field/email-field';
import { AuthApi } from '../../../@api/auth/auth.api';

@Component({
  selector: 'app-forgot-password',
  imports: [
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    EmailField,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  hide = signal(true);
  loading = false;

  showOtp = false;

  private authApi = inject(AuthApi);
  private router = inject(Router);

  otpControls = [
    new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
  ];

  @Output() verified = new EventEmitter<{
    verificationToken: string;
  }>();

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.authApi
      .forgotPassword({
        email: this.forgotPasswordForm.value.email!,
      })
      .subscribe({
        next: (res) => {
          alert(res.message);
          this.showOtp = true;
        },
        error: () => {
          this.loading = false;
          alert('Something went wrong');
        },
      });
  }

  verifyForgotPassword() {
    const otp = this.otpControls.map((control) => control.value).join('');

    if (otp.length !== 6) {
      alert('Please enter 6 digit OTP');
      return;
    }

    this.authApi
      .verifyForgotPassword({ email: this.forgotPasswordForm.value.email!, otpNumber: otp })
      .subscribe({
        next: (response) => {
          this.verified.emit({
            verificationToken: response.verificationToken,
          });
          this.router.navigate(['/reset-password'], {
            queryParams: { token: response.verificationToken },
          });
        },

        error: (err) => {
          alert(err.error);
        },
      });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
