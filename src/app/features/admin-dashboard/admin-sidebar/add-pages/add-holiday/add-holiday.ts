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
import { HolidaysApi } from '../../../../../@api/holidays/holidays.api';
import { OfficesApi } from '../../../../../@api/offices/offices.api';
import { DistrictsApi } from '../../../../../@api/districts/districts.api';
import { StatesApi } from '../../../../../@api/states/states.api';
import { Office } from '../../../../../@api/offices/offices.type';
import { District } from '../../../../../@api/districts/districts.type';
import { State } from '../../../../../@api/states/states.type';

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
  private holidayApi = inject(HolidaysApi);
  private officeApi = inject(OfficesApi);
  private districtApi = inject(DistrictsApi);
  private stateApi = inject(StatesApi);

  addHoliday = new FormGroup({
    officeId: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    year: new FormControl<number | null>(null, [Validators.required]),
    isNationalHoliday: new FormControl<boolean | null>(null, [Validators.required]),
    holidayDate: new FormControl<Date | null>(null, [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
    districtId: new FormControl('', [Validators.required]),
  });

  offices: Office.Detail[] = [];
  districts: District.Base[] = [];
  states: State.Detail[] = [];

  saveHoliday() {
    if (this.addHoliday.invalid) {
      this.addHoliday.markAllAsTouched();
      return;
    }

    this.holidayApi
      .create({
        title: this.addHoliday.value.title!,
        officeId: this.addHoliday.value.officeId!,
        description: this.addHoliday.value.description!,
        year: this.addHoliday.value.year!,
        isNationalHoliday: this.addHoliday.value.isNationalHoliday!,
        holidayDate: this.addHoliday.value.holidayDate!,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
      });
  }

  onHolidayTypeChange(isNational: boolean) {
    if (isNational) {
      this.addHoliday.patchValue({
        stateId: '',
        districtId: '',
        officeId: '',
      });

      this.addHoliday.controls.stateId.disable();
      this.addHoliday.controls.districtId.disable();
      this.addHoliday.controls.officeId.disable();
    } else {
      this.addHoliday.controls.stateId.enable();
      this.addHoliday.controls.districtId.enable();
      this.addHoliday.controls.officeId.enable();
    }
  }

  selectStates() {
    this.stateApi.selectState().subscribe({
      next: (response) => {
        this.states = response.data;
      },
      error: (err) => console.log(err),
    });
  }

  onStateChange(stateId: string) {
    this.districts = [];

    this.offices = [];

    this.addHoliday.patchValue({
      districtId: '',

      officeId: '',
    });

    this.selectDistricts(stateId);
  }

  selectDistricts(stateId: string) {
    this.districtApi.selectDistrict(stateId).subscribe({
      next: (response) => {
        this.districts = response.data;
      },
      error: (err) => console.log(err),
    });
  }

  onDistrictChange(districtId: string) {
    this.offices = [];

    this.addHoliday.patchValue({
      officeId: '',
    });

    this.selectoffices(districtId);
  }

  selectoffices(districtId: string) {
    this.officeApi.selectOffice(districtId).subscribe({
      next: (response) => {
        this.offices = response.data;
      },
      error: (err) => console.log(err),
    });
  }

  constructor(private dialogRef: MatDialogRef<AddHoliday>) {
    this.selectStates();
    this.addHoliday.controls.stateId.disable();
    this.addHoliday.controls.districtId.disable();
    this.addHoliday.controls.officeId.disable();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate: Date = new Date();
}
