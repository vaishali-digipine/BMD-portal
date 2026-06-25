import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { RouterLink } from '@angular/router';
import { AadharVerification } from '../../../../shared/aadhar-verification/aadhar-verification';
import { EmailField } from '../../../../shared/email-field/email-field';

interface Gender {
  value: string;
  viewValue: string;
}

interface deathType {
  value: string;
  viewValue: string;
}

interface District {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-death-service',
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
    MatDatepickerModule,
    MatRadioButton,
    MatRadioGroup,
    RouterLink,
    MatHint,
    MatStepperModule,
    MatTimepickerModule,
    AadharVerification,
    EmailField,
  ],
  templateUrl: './death-service.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './death-service.css',
})
export class DeathService {
  isLinear = false;

  firstFormGroup = new FormGroup({
    deceasedAadharNumber: new FormControl('', [Validators.required]),
    deceasedName: new FormControl('', [Validators.required]),
    deceasedBirthDate: new FormControl('', [Validators.required]),
    deceasedGender: new FormControl('', [Validators.required]),
    placeOfDeath: new FormControl('', [Validators.required]),
    dateOfDeath: new FormControl('', [Validators.required]),
    deceasedFatherName: new FormControl('', [Validators.required]),
    deceasedMotherName: new FormControl('', [Validators.required]),
    spouseName: new FormControl('', [Validators.required]),
    deceasedStreet: new FormControl('', [Validators.required]),
    deceasedCity: new FormControl('', [Validators.required]),
    deceasedSubDistrict: new FormControl('', [Validators.required]),
    deceasedDistrict: new FormControl('', [Validators.required]),
    deceasedState: new FormControl('', [Validators.required]),
    deceasedPinCode: new FormControl('', [Validators.required]),
  });

  secondFormGroup = new FormGroup({
    spouseAadharNumber: new FormControl('', [Validators.required]),
    spouseName: new FormControl('', [Validators.required]),
    spouseEmail: new FormControl('', [Validators.required]),
    spouseGender: new FormControl('', [Validators.required]),
    spouseMobileNumber: new FormControl('', [Validators.required]),
    spouseBirthDate: new FormControl('', [Validators.required]),
    spouseStreet: new FormControl('', [Validators.required]),
    spouseCity: new FormControl('', [Validators.required]),
    spouseSubDistrict: new FormControl('', [Validators.required]),
    spouseDistrict: new FormControl('', [Validators.required]),
    spouseState: new FormControl('', [Validators.required]),
    spousePinCode: new FormControl('', [Validators.required]),
  });

  thirdFormGroup = new FormGroup({});

  fourthFormGroup = new FormGroup({
    slotDate: new FormControl('', [Validators.required]),
  });

  deathCertificate() {}

  onFileSelected(event: Event) {
    event.preventDefault;
  }

  dType: deathType[] = [
    { value: 'natural', viewValue: 'Natural' },
    { value: 'unnatural', viewValue: 'Unnatural' },
  ];

  districts: District[] = [
    { value: 'Porbandar-0', viewValue: 'Porbandar' },
    { value: 'Dwarka-1', viewValue: 'Dwarka' },
    { value: 'rajkot-2', viewValue: 'Rajkot' },
  ];

  genders: Gender[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'other', viewValue: 'Other' },
  ];

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 79, 0, 1);
  readonly maxDate = new Date(this._currentYear + 0, 11, 31);

  readonly slotMinDate = new Date(this._currentYear - 0, 0, 1);
  readonly slotMaxDate = new Date(this._currentYear + 1, 11, 31);
}
