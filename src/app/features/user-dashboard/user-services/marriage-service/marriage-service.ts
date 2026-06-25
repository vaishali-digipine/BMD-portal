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

interface District {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-marriage-service',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatHint,
    MatStepperModule,
    MatTimepickerModule,
    MatRadioButton,
    MatRadioGroup,
    AadharVerification,
    EmailField,
  ],
  templateUrl: './marriage-service.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './marriage-service.css',
})
export class MarriageService {
  firstFormGroup = new FormGroup({
    brideAadharNumber: new FormControl('', [Validators.required]),
    brideName: new FormControl('', [Validators.required]),
    brideFatherName: new FormControl('', [Validators.required]),
    brideMotherName: new FormControl('', [Validators.required]),
    brideBirthDate: new FormControl('', [Validators.required]),
    brideEmail: new FormControl('', [Validators.required]),
    brideMobileNumber: new FormControl('', [Validators.required]),
    brideGender: new FormControl('', [Validators.required]),
    brideStreet: new FormControl('', [Validators.required]),
    brideCity: new FormControl('', [Validators.required]),
    brideSubDistrict: new FormControl('', [Validators.required]),
    brideDistrict: new FormControl('', [Validators.required]),
    brideState: new FormControl('', [Validators.required]),
    bridePinCode: new FormControl('', [Validators.required]),
  });

  secondFormGroup = new FormGroup({
    groomAadharNumber: new FormControl('', [Validators.required]),
    groomName: new FormControl('', [Validators.required]),
    groomFatherName: new FormControl('', [Validators.required]),
    groomMotherName: new FormControl('', [Validators.required]),
    groomBirthDate: new FormControl('', [Validators.required]),
    groomEmail: new FormControl('', [Validators.required]),
    groomMobileNumber: new FormControl('', [Validators.required]),
    groomGender: new FormControl('', [Validators.required]),
    groomStreet: new FormControl('', [Validators.required]),
    groomCity: new FormControl('', [Validators.required]),
    groomSubDistrict: new FormControl('', [Validators.required]),
    groomDistrict: new FormControl('', [Validators.required]),
    groomState: new FormControl('', [Validators.required]),
    groomPinCode: new FormControl('', [Validators.required]),
  });

  thirdFormGroup = new FormGroup({
    marriageDate: new FormControl('', [Validators.required]),
    marriagePlace: new FormControl('', [Validators.required]),
  });

  fourthFormGroup = new FormGroup({
    witnessAadharNumber: new FormControl('', [Validators.required]),
    witnessName: new FormControl('', [Validators.required]),
    witnessMobileNo: new FormControl('', [Validators.required]),
    witnessEmail: new FormControl('', [Validators.required]),
    witnessRelation: new FormControl('', [Validators.required]),
    witnessGender: new FormControl('', [Validators.required]),
    witnessStreet: new FormControl('', [Validators.required]),
    witnessCity: new FormControl('', [Validators.required]),
    witnessSubDistrict: new FormControl('', [Validators.required]),
    witnessDistrict: new FormControl('', [Validators.required]),
    witnessState: new FormControl('', [Validators.required]),
    witnessPinCode: new FormControl('', [Validators.required]),

    priestAadharNumber: new FormControl('', [Validators.required]),
    priestName: new FormControl('', [Validators.required]),
    priestMobileNo: new FormControl('', [Validators.required]),
  });

  fifthFormGroup = new FormGroup({});

  sixthFormGroup = new FormGroup({
    slotDate: new FormControl('', [Validators.required]),
  });

  isLinear = false;

  marriageCertificate() {}

  onFileSelected(event: Event) {
    event.preventDefault();
  }

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
