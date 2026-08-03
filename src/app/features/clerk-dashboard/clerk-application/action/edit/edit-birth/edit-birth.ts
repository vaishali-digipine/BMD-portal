import { Component, inject } from '@angular/core';
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
import { BirthServicesApi } from '../../../../../../@api/birthService/birth-services.api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { District } from '../../../../../../@api/districts/districts.type';
import { DistrictsApi } from '../../../../../../@api/districts/districts.api';

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
    RouterLink,
    MatInputModule,
    MatCard,
    MatButtonModule,

    MatTimepickerModule,
    MatInputModule,
    MatOption,
  ],
  templateUrl: './edit-birth.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './edit-birth.css',
})
export class EditBirth {
  editBirthForm = new FormGroup({
    babyName: new FormControl('', Validators.required),
    birthTime: new FormControl('', Validators.required),
    birthPlace: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    birthDate: new FormControl<Date | string | null>(null, Validators.required),
    district: new FormControl('', Validators.required),
  });

  private birthApi = inject(BirthServicesApi);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private districtApi = inject(DistrictsApi);

  birthId = '';
  districts: District.Base[] = [];

  constructor() {
    this.selectDistricts();

    this.birthId = this.route.snapshot.paramMap.get('id')!;

    if (this.birthId) {
      this.getBirthDetails(this.birthId);
    }
  }
  selectDistricts() {
    this.districtApi.formDistrict().subscribe({
      next: (res) => {
        this.districts = res.data;
      },
      error: console.error,
    });
  }

  getBirthDetails(birthId: string) {
    this.birthApi.getById(birthId).subscribe({
      next: (response) => {
        const birth = response.data;

        this.editBirthForm.patchValue({
          babyName: birth.birthName,
          birthTime: birth.birthTime,
          birthPlace: birth.birthPlace,
          weight: birth.birthWeight.toString(),
          birthDate: new Date(birth.birthDate),
          district: birth.birthDistrict._id,
        });
      },
      error: console.error,
    });
  }
  updateBirthApplication() {
    if (this.editBirthForm.invalid) {
      this.editBirthForm.markAllAsTouched();
      return;
    }

    this.birthApi
      .update(this.birthId, {
        birthName: this.editBirthForm.value.babyName!,
        birthTime: this.editBirthForm.value.birthTime!,
        birthPlace: this.editBirthForm.value.birthPlace!,
        birthWeight: Number(this.editBirthForm.value.weight),
        birthDate: new Date(this.editBirthForm.value.birthDate!),
        birthDistrict: this.editBirthForm.value.district!,
      })
      .subscribe({
        next: () => {
          alert('Birth Application Updated Successfully');

          this.router.navigate(['/clerk-application']);
        },
        error: console.error,
      });
  }

  private readonly _currentYear = new Date().getFullYear();

  readonly minDate = new Date(this._currentYear - 10, 0, 1);
  readonly maxDate = new Date();
}
