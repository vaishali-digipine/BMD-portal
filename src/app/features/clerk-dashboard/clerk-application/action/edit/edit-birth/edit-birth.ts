import { Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MatDatepickerToggle,
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatSelect, MatOption } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTimepicker, MatTimepickerModule } from '@angular/material/timepicker';

interface District {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-birth',
  imports: [
    MatFormField,
    MatLabel,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatInputModule,
    MatCard,
    MatButtonModule,
    MatTimepicker,
    MatTimepickerModule,
    MatInputModule,
  ],
  templateUrl: './edit-birth.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './edit-birth.css',
})
export class EditBirth {
  editBirthForm = new FormGroup({
    // Baby Details
    babyName: new FormControl('', Validators.required),
    birthTime: new FormControl('', Validators.required),
    birthPlace: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),

    fatherContactNumber: new FormControl('', Validators.required),
    fatherEmail: new FormControl('', [Validators.required, Validators.email]),
    motherContactNumber: new FormControl('', Validators.required),
    motherEmail: new FormControl('', [Validators.required, Validators.email]),
  });

  districts: District[] = [
    { value: 'porbandar', viewValue: 'Porbandar' },
    { value: 'dwarka', viewValue: 'Dwarka' },
    { value: 'rajkot', viewValue: 'Rajkot' },
  ];

  private readonly _currentYear = new Date().getFullYear();

  readonly minDate = new Date(this._currentYear - 10, 0, 1);
  readonly maxDate = new Date(this._currentYear, 11, 31);

  updateBirthApplication() {}
}
