import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { PasswordField } from '../../../shared/password-field/password-field';
import { EmailField } from '../../../shared/email-field/email-field';
import { AadharVerification } from '../../../shared/aadhar-verification/aadhar-verification';

interface District {
  value: string;
  viewValue: string;
}

interface Office {
  value: string;
  viewValue: string;
}

interface Department {
  value: string;
  viewValue: string;
}
interface State {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-clerk-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioGroup,
    MatRadioButton,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatHint,
    RouterLink,
    PasswordField,
    EmailField,
    AadharVerification,
  ],
  templateUrl: './clerk-signup.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './clerk-signup.css',
})
export class ClerkSignup {
  hide = signal(true);
  clerkSignUpForm = new FormGroup({
    aadharNumber: new FormControl('', [Validators.required, Validators.minLength(12)]),
    otp: new FormControl('', [Validators.required]),
    employeeID: new FormControl('', [Validators.required]),
    clerkName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gender: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', Validators.required),
    aadharCard: new FormControl('', [Validators.required]),
    employeeId: new FormControl('', [Validators.required]),
  });

  districts: District[] = [
    { value: 'Porbandar-0', viewValue: 'Porbandar' },
    { value: 'Dwarka-1', viewValue: 'Dwarka' },
    { value: 'rajkot-2', viewValue: 'Rajkot' },
  ];

  offices: Office[] = [{ value: 'office-0', viewValue: 'office' }];

  states: State[] = [{ value: '1', viewValue: 'Gujarat' }];

  departments: Department[] = [
    { value: 'Porbandar-0', viewValue: 'Porbandar' },
    { value: 'Dwarka-1', viewValue: 'Dwarka' },
    { value: 'rajkot-2', viewValue: 'Rajkot' },
  ];

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 79, 0, 1);
  readonly maxDate = new Date(this._currentYear + 0, 11, 31);

  onClerkSignUp() {}
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onFileSelected(event: Event) {
    event.preventDefault;
  }
}
