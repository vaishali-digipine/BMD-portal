import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { inject } from '@angular/core/primitives/di';
import { BirthServicesApi } from '../../../../../../@api/birthService/birth-services.api';
import { MarriageServiceApi } from '../../../../../../@api/marriageService/marriage-service.api';
import { DistrictsApi } from '../../../../../../@api/districts/districts.api';
import { District } from '../../../../../../@api/districts/districts.type';

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
    brideFatherName: new FormControl('', Validators.required),

    brideMotherName: new FormControl('', Validators.required),

    groomFatherName: new FormControl('', Validators.required),

    groomMotherName: new FormControl('', Validators.required),

    marriageDate: new FormControl<Date | null>(null, Validators.required),

    marriagePlace: new FormControl('', Validators.required),

    district: new FormControl('', Validators.required),

    witnessRelation: new FormControl('', Validators.required),
  });

  private marriageApi = inject(MarriageServiceApi);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private districtApi = inject(DistrictsApi);

  marriageId = '';
  districts: District.Base[] = [];

  constructor() {
    this.selectDistricts();
    this.marriageId = this.route.snapshot.paramMap.get('id')!;

    if (this.marriageId) {
      this.getMarriageDetails(this.marriageId);
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

  getMarriageDetails(marriageId: string) {
    this.marriageApi.getById(marriageId).subscribe({
      next: (response) => {
        const marriage = response.data;

        this.editMarriageForm.patchValue({
          brideFatherName: marriage.brideFatherName,
          brideMotherName: marriage.brideMotherName,

          groomFatherName: marriage.groomFatherName,
          groomMotherName: marriage.groomMotherName,

          marriageDate: new Date(marriage.marriageDate),
          marriagePlace: marriage.marriagePlace,
          district: marriage.marriageDistrict._id,

          witnessRelation: marriage.witnessRelation,
        });
      },
      error: console.error,
    });
  }

  updateMarriageApplication() {
    if (this.editMarriageForm.invalid) {
      this.editMarriageForm.markAllAsTouched();
      return;
    }

    this.marriageApi
      .update(this.marriageId, {
        brideFatherName: this.editMarriageForm.value.brideFatherName!,
        brideMotherName: this.editMarriageForm.value.brideMotherName!,
        groomFatherName: this.editMarriageForm.value.groomFatherName!,
        groomMotherName: this.editMarriageForm.value.groomMotherName!,
        marriageDate: this.editMarriageForm.value.marriageDate!,
        marriagePlace: this.editMarriageForm.value.marriagePlace!,
        districId: this.editMarriageForm.value.district!,
        witnessRelation: this.editMarriageForm.value.witnessRelation!,
      })
      .subscribe({
        next: () => {
          alert('Marriage Application Updated Successfully');

          this.router.navigate(['/clerk-application']);
        },
        error: console.error,
      });
  }

  private readonly _currentYear = new Date().getFullYear();

  readonly minDate = new Date(this._currentYear - 5, 0, 1);

  readonly maxDate = new Date();
}
