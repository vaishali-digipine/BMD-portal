import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

interface DeathType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-death',
  standalone: true,
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
  ],
  templateUrl: './edit-death.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './edit-death.css',
})
export class EditDeath {
  editDeathForm = new FormGroup({
    placeOfDeath: new FormControl('', [Validators.required]),

    dateOfDeath: new FormControl('', [Validators.required]),

    deathType: new FormControl('', [Validators.required]),

    deceasedMotherName: new FormControl('', [Validators.required]),

    deceasedFatherName: new FormControl('', [Validators.required]),
  });

  dType = [
    { value: 'Natural', viewValue: 'Natural' },
    { value: 'Unnatural', viewValue: 'Unnatural' },
  ];

  private readonly _currentYear = new Date().getFullYear();

  readonly minDate = new Date(this._currentYear - 79, 0, 1);

  readonly maxDate = new Date(this._currentYear, 11, 31);

  updateDeathApplication() {}
}
