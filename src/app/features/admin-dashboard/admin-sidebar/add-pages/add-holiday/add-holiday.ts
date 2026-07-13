import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

interface Offices {
  value: string;
  viewValue: string;
}

interface Holidays {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-holiday',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatHint,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './add-holiday.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './add-holiday.css',
})
export class AddHoliday {
  private router = inject(Router);

  addHoliday = new FormGroup({
    officeName: new FormControl('', [Validators.required]),
    holidayName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(250)]),
  });

  offices: Offices[] = [{ value: '1', viewValue: 'Porbandar' }];

  holidays: Holidays[] = [
    { value: '1', viewValue: 'Yes' },
    { value: '1', viewValue: 'No' },
  ];

  constructor(private dialogRef: MatDialogRef<AddHoliday>) {}

  closeDialog() {
    this.dialogRef.close();
  }

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 0, 0, 1);
  readonly maxDate = new Date(this._currentYear + 1, 11, 31);
}
