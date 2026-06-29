import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface District {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-marriage',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './edit-marriage.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './edit-marriage.css',
})
export class EditMarriage {
  editMarriageForm = new FormGroup({
    brideEmail: new FormControl('', [Validators.required, Validators.email]),

    brideFatherName: new FormControl('', Validators.required),

    brideMotherName: new FormControl('', Validators.required),

    brideMobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),

    groomEmail: new FormControl('', [Validators.required, Validators.email]),

    groomFatherName: new FormControl('', Validators.required),

    groomMotherName: new FormControl('', Validators.required),

    groomMobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
    ]),

    marriageDate: new FormControl('', Validators.required),

    marriagePlace: new FormControl('', Validators.required),

    district: new FormControl('', Validators.required),

    witnessEmail: new FormControl('', [Validators.required, Validators.email]),

    witnessMobileNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),

    witnessRelation: new FormControl('', Validators.required),

    priestMobileNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
  });

  districts: District[] = [
    { value: 'porbandar', viewValue: 'Porbandar' },
    { value: 'dwarka', viewValue: 'Dwarka' },
    { value: 'rajkot', viewValue: 'Rajkot' },
    { value: 'jamnagar', viewValue: 'Jamnagar' },
  ];

  private readonly _currentYear = new Date().getFullYear();

  readonly minDate = new Date(this._currentYear - 5, 0, 1);

  readonly maxDate = new Date(this._currentYear + 1, 11, 31);

  updateMarriageApplication() {}
}
