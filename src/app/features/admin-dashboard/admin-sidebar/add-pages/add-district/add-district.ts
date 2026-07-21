import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { DistrictsApi } from '../../../../../@api/districts/districts.api';
import { StatesApi } from '../../../../../@api/states/states.api';
import { State } from '../../../../../@api/states/states.type';

@Component({
  selector: 'app-add-district',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatButtonModule,
    MatError,
    MatInputModule,
  ],
  templateUrl: './add-district.html',
  styleUrl: './add-district.css',
})
export class AddDistrict {
  private router = inject(Router);
  private districtApi = inject(DistrictsApi);
  private stateApi = inject(StatesApi);

  states: State.Detail[] = [];

  addDistrict = new FormGroup({
    name: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
  });

  saveDistrict() {
    if (this.addDistrict.invalid) {
      this.addDistrict.markAllAsTouched();
      return;
    }

    this.districtApi
      .create({
        name: this.addDistrict.value.name!,
        stateId: this.addDistrict.value.stateId!,
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

  constructor(private dialogRef: MatDialogRef<AddDistrict>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
