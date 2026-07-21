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
import { AadharVerification } from '../../../shared/aadhar-verification/aadhar-verification';
import { AuthApi } from '../../../@api/auth/auth.api';
import { Auth } from '../../../@api/auth/auth.type';

@Component({
  selector: 'app-user-signup',
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
    AadharVerification,
  ],
  templateUrl: './user-signup.html',
  styleUrl: './user-signup.css',
})
export class UserSignup {
  hide = signal(true);

  private authApi = inject(AuthApi);
  private router = inject(Router);
  isAadharVerified = false;

  verificationToken = '';

  userSignUpForm = new FormGroup({
    aadharNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]),
    userName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required]),
    mobileNo: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(10),
    ]),
    password: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    confirmPassword: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 79, 0, 1);
  readonly maxDate = new Date(this._currentYear + 0, 11, 31);

  onUserSignUp() {
    if (this.userSignUpForm.invalid) {
      this.userSignUpForm.markAllAsTouched();
      return;
    }
    this.authApi
      .register({
        verificationToken: this.verificationToken,
        password: this.userSignUpForm.value.password!,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Registration Successful');
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }

  onAadharVerified(event: Auth.Apis.VerifyOtpResponse) {
    this.verificationToken = event.verificationToken;

    this.userSignUpForm.patchValue({
      userName: `${event.data.firstName} ${event.data.middleName ?? ''} ${event.data.lastName}`,

      email: event.data.email,

      mobileNo: event.data.contact,
    });

    this.userSignUpForm.controls.password.enable();

    this.userSignUpForm.controls.confirmPassword.enable();

    this.isAadharVerified = true;
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
