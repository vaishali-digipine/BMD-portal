import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { StatesApi } from '../../../../../@api/states/states.api';
import { DistrictsApi } from '../../../../../@api/districts/districts.api';
import { OfficesApi } from '../../../../../@api/offices/offices.api';
import { State } from '../../../../../@api/states/states.type';
import { District } from '../../../../../@api/districts/districts.type';
import { Office } from '../../../../../@api/offices/offices.type';

@Component({
  selector: 'app-add-office',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButtonModule,
    MatError,
    MatInputModule,
  ],
  templateUrl: './add-office.html',
  styleUrl: './add-office.css',
})
export class AddOffice {
  private router = inject(Router);
  private stateApi = inject(StatesApi);
  private districtApi = inject(DistrictsApi);
  private officeApi = inject(OfficesApi);

  addOffice = new FormGroup({
    name: new FormControl('', [Validators.required]),
    districtId: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
  });

  states: State.Detail[] = [];

  districts: District.Base[] = [];

  offices: Office.Detail[] = [];

  saveOffice() {
    if (this.addOffice.invalid) {
      this.addOffice.markAllAsTouched();
      return;
    }

    this.officeApi
      .create({
        name: this.addOffice.value.name!,
        districtId: this.addOffice.value.districtId!,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
      });
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

    this.addOffice.patchValue({
      districtId: '',
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

  constructor(private dialogRef: MatDialogRef<AddOffice>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
