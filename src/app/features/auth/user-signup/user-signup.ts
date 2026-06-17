import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { PasswordField } from '../../../shared/password-field/password-field';
import { EmailField } from '../../../shared/email-field/email-field';
import { AadharVerification } from '../../../shared/aadhar-verification/aadhar-verification';

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
  userSignUpForm = new FormGroup({
    aadharNumber: new FormControl('', [Validators.required, Validators.minLength(12)]),
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 79, 0, 1);
  readonly maxDate = new Date(this._currentYear + 0, 11, 31);

  onUserSignUp() {}
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
