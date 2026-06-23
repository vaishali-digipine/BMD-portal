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

interface District {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-birth-service',
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
    MatTimepickerModule,
    MatStepperModule,
    AadharVerification,
    EmailField,
  ],
  templateUrl: './birth-service.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './birth-service.css',
})
export class BirthService {
  isLinear = false;

  firstFormGroup = new FormGroup({
    babyName: new FormControl('', [Validators.required]),
    birthTime: new FormControl('', [Validators.required]),
    birthPlace: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
  });

  secondFormGroup = new FormGroup({
    fatherAadharCard: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    fatherContactNumber: new FormControl('', [Validators.required]),
    fatherEmail: new FormControl('', [Validators.required]),
    fatherBirthDate: new FormControl('', [Validators.required]),
    fatherStreet: new FormControl('', [Validators.required]),
    fatherCity: new FormControl('', [Validators.required]),
    fatherSubDistrict: new FormControl('', [Validators.required]),
    fatherDistrict: new FormControl('', [Validators.required]),
    fatherState: new FormControl('', [Validators.required]),
    fatherPinCode: new FormControl('', [Validators.required]),

    motherAadharCard: new FormControl('', [Validators.required]),
    motherName: new FormControl('', [Validators.required]),
    motherContactNumber: new FormControl('', [Validators.required]),
    motherEmail: new FormControl('', [Validators.required]),
    motherBirthDate: new FormControl('', [Validators.required]),
    motherStreet: new FormControl('', [Validators.required]),
    motherCity: new FormControl('', [Validators.required]),
    motherSubDistrict: new FormControl('', [Validators.required]),
    motherDistrict: new FormControl('', [Validators.required]),
    motherState: new FormControl('', [Validators.required]),
    motherPinCode: new FormControl('', [Validators.required]),

    PermanentStreet: new FormControl('', [Validators.required]),
    PermanentCity: new FormControl('', [Validators.required]),
    PermanentSubDistrict: new FormControl('', [Validators.required]),
    PermanentDistrict: new FormControl('', [Validators.required]),
    PermanentState: new FormControl('', [Validators.required]),
    PermanentPinCode: new FormControl('', [Validators.required]),
  });

  thirdFormGroup = new FormGroup({});

  fourthFormGroup = new FormGroup({
    slotDate: new FormControl('', [Validators.required]),
  });

  districts: District[] = [
    { value: 'Porbandar-0', viewValue: 'Porbandar' },
    { value: 'Dwarka-1', viewValue: 'Dwarka' },
    { value: 'rajkot-2', viewValue: 'Rajkot' },
  ];

  birthCertificate() {}

  onFileSelected(event: Event) {
    event.preventDefault;
  }

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 79, 0, 1);
  readonly maxDate = new Date(this._currentYear + 0, 11, 31);

  readonly slotMinDate = new Date(this._currentYear - 0, 0, 1);
  readonly slotMaxDate = new Date(this._currentYear + 1, 11, 31);
}
