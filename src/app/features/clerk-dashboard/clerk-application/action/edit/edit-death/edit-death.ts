import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { provideNativeDateAdapter, MatOptionModule } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DeathService } from '../../../../../../@api/deathService/deathService.type';
import { DeathserviceApi } from '../../../../../../@api/deathService/deathservice.api';
import { ActivatedRoute, Router } from '@angular/router';
import { DistrictsApi } from '../../../../../../@api/districts/districts.api';
import { District } from '../../../../../../@api/districts/districts.type';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-death',
  standalone: true,
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatLabel,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCard,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './edit-death.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './edit-death.css',
})
export class EditDeath {
  editDeathForm = new FormGroup({
    placeOfDeath: new FormControl('', [Validators.required]),

    dateOfDeath: new FormControl<Date | null>(null, [Validators.required]),

    deathTime: new FormControl('', [Validators.required]),

    deceasedMotherName: new FormControl('', [Validators.required]),

    deceasedFatherName: new FormControl('', [Validators.required]),
    district: new FormControl('', [Validators.required]),
  });

  private birthApi = inject(DeathserviceApi);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private districtApi = inject(DistrictsApi);

  deathId = '';
  districts: District.Base[] = [];

  constructor() {
    this.selectDistricts();
    this.deathId = this.route.snapshot.paramMap.get('id')!;

    if (this.deathId) {
      this.getDeathDetails(this.deathId);
    }
  }
  selectDistricts() {
    this.districtApi.formDistrict().subscribe({
      next: (response) => {
        this.districts = response.data;
      },
      error: console.error,
    });
  }

  getDeathDetails(deathId: string) {
    this.birthApi.getById(deathId).subscribe({
      next: (response) => {
        const death = response.data;

        this.editDeathForm.patchValue({
          placeOfDeath: death.deathPlace,
          deathTime: death.deathTime,
          dateOfDeath: new Date(death.deathDate),
          deceasedMotherName: death.deceasedMotherName,
          deceasedFatherName: death.deceasedFatherName,
          district: death.deathDistrict._id,
        });
      },
      error: console.error,
    });
  }

  updateDeathApplication() {
    if (this.editDeathForm.invalid) {
      this.editDeathForm.markAllAsTouched();
      return;
    }

    this.birthApi
      .update(this.deathId, {
        deathPlace: this.editDeathForm.value.placeOfDeath!,
        deathTime: this.editDeathForm.value.deathTime!,
        deathDate: new Date(this.editDeathForm.value.placeOfDeath!),
        deceasedMotherName: this.editDeathForm.value.deceasedMotherName!,
        deceasedFatherName: this.editDeathForm.value.deceasedFatherName!,
        deathDistrict: this.editDeathForm.value.district!,
      })
      .subscribe({
        next: () => {
          alert('Death Application Updated Successfully');

          this.router.navigate(['/clerk-application']);
        },
        error: console.error,
      });
  }

  dType = [
    { value: 'Natural', viewValue: 'Natural' },
    { value: 'Unnatural', viewValue: 'Unnatural' },
  ];

  private readonly _currentYear = new Date().getFullYear();

  readonly minDate = new Date(this._currentYear - 79, 0, 1);
  readonly maxDate = new Date();
}
