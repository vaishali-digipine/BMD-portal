import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Router, RouterLink } from '@angular/router';
import { AadharVerification } from '../../../../shared/aadhar-verification/aadhar-verification';
import { EmailField } from '../../../../shared/email-field/email-field';
import { DeathserviceApi } from '../../../../@api/deathService/deathservice.api';
import { ApplicationApi } from '../../../../@api/applications/application.api';
import { DistrictsApi } from '../../../../@api/districts/districts.api';
import { OfficesApi } from '../../../../@api/offices/offices.api';
import { AuthApi } from '../../../../@api/auth/auth.api';
import { DepartmentsApi } from '../../../../@api/departments/departments.api';
import { OfficeDepartmentsApi } from '../../../../@api/officeDepartments/office-departments.api';
import { SlotApi } from '../../../../@api/slots/slot.api';
import { Slot } from '../../../../@api/slots/slots.type';
import { District } from '../../../../@api/districts/districts.type';
import { Office } from '../../../../@api/offices/offices.type';
import { Auth } from '../../../../@api/auth/auth.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-death-service',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioButton,
    MatRadioGroup,
    RouterLink,
    MatHint,
    MatStepperModule,
    MatTimepickerModule,
    DatePipe,
  ],
  templateUrl: './death-service.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './death-service.css',
})
export class DeathService {
  isLinear = true;

  private deathApi = inject(DeathserviceApi);

  private applicationApi = inject(ApplicationApi);

  private districtApi = inject(DistrictsApi);

  private officeApi = inject(OfficesApi);

  private authApi = inject(AuthApi);

  private departmentApi = inject(DepartmentsApi);

  private officedepartmentApi = inject(OfficeDepartmentsApi);

  private slotApi = inject(SlotApi);

  private router = inject(Router);

  firstFormGroup = new FormGroup({
    deceasedAadharNumber: new FormControl('', [Validators.required]),
    deceasedAadharId: new FormControl('', [Validators.required]),
    deceasedName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    deceasedBirthDate: new FormControl<Date | null>({ value: null, disabled: true }, [
      Validators.required,
    ]),
    deceasedGender: new FormControl({ value: '', disabled: true }, [Validators.required]),
    deathPlace: new FormControl('', [Validators.required]),
    deathdate: new FormControl('', [Validators.required]),
    deceasedFatherName: new FormControl('', [Validators.required]),
    deceasedMotherName: new FormControl('', [Validators.required]),
    deathType: new FormControl('', [Validators.required]),
    deathTime: new FormControl('', [Validators.required]),
    deceasedStreet: new FormControl({ value: '', disabled: true }, [Validators.required]),
    deceasedCity: new FormControl({ value: '', disabled: true }, [Validators.required]),
    deceasedDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    districtId: new FormControl('', [Validators.required]),
    deceasedSubDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    deceasedState: new FormControl({ value: '', disabled: true }, [Validators.required]),
    deceasedPinCode: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  secondFormGroup = new FormGroup({
    spouseAadharNumber: new FormControl('', [Validators.required]),
    spouseAadharId: new FormControl('', [Validators.required]),
    spouseName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    spouseEmail: new FormControl({ value: '', disabled: true }, [Validators.required]),
    spouseGender: new FormControl({ value: '', disabled: true }, [Validators.required]),
    spouseMobileNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
    spouseBirthDate: new FormControl<Date | null>({ value: null, disabled: true }, [
      Validators.required,
    ]),
    spouseStreet: new FormControl({ value: '', disabled: true }, [Validators.required]),
    spouseCity: new FormControl({ value: '', disabled: true }, [Validators.required]),
    spouseSubDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    spouseDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    spouseState: new FormControl({ value: '', disabled: true }, [Validators.required]),
    spousePinCode: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  thirdFormGroup = new FormGroup({
    deceasedAadharCard: new FormControl<File | null>(null, Validators.required),
    spouseAadharCard: new FormControl<File | null>(null, Validators.required),
    deceasedRationCard: new FormControl<File | null>(null, Validators.required),
    deceasedPhoto: new FormControl<File | null>(null, Validators.required),
    deceasedMedicalCertificate: new FormControl<File | null>(null, Validators.required),
    pmReport: new FormControl<File | null>(null),
    fir: new FormControl<File | null>(null),
  });

  fourthFormGroup = new FormGroup({
    slotDate: new FormControl('', [Validators.required]),
    officeId: new FormControl('', [Validators.required]),
    slotTime: new FormControl('', [Validators.required]),
  });

  deceasedAadharCard!: File;
  spouseAadharCard!: File;
  deceasedRationCard!: File;
  deceasedPhoto!: File;
  deceasedMedicalCertificate!: File;
  pmReport!: File;
  fir!: File;

  departmentId = '';
  officeDepartmentId = '';
  selectedSlotId = '';

  availableDates: string[] = [];

  availableSlots: Slot.Base[] = [];

  districts: District.Base[] = [];

  offices: Office.Detail[] = [];

  deathServiceId = '';
  serviceType: any;

  constructor() {
    this.firstFormGroup.controls.deathType.valueChanges.subscribe((value) => {
      const fir = this.thirdFormGroup.controls.fir;
      const pm = this.thirdFormGroup.controls.pmReport;

      if (value === 'unnatural') {
        fir.setValidators([Validators.required]);
        pm.setValidators([Validators.required]);
      } else {
        fir.clearValidators();
        pm.clearValidators();

        fir.setValue(null);
        pm.setValue(null);
      }
    });
    this.selectDistricts();
  }

  selectDistricts() {
    this.districtApi.formDistrict().subscribe({
      next: (response) => {
        this.districts = response.data;
      },
      error: (err) => console.log(err),
    });
  }
  onDistrictChange(districtId: string) {
    console.log('District Id:', districtId);

    this.offices = [];

    this.fourthFormGroup.patchValue({
      officeId: '',
    });

    this.selectOffices(districtId);
  }

  selectOffices(districtId: string) {
    this.officeApi.selectOffice(districtId).subscribe({
      next: (response) => {
        this.offices = response.data;
      },
      error: (err) => console.log(err),
    });
  }

  officeChanged(officeId: string) {
    this.departmentApi.getDepartment('death').subscribe({
      next: (response) => {
        this.departmentId = response.data[0]._id;
        this.serviceType = response.data[0].name.toLowerCase();
        this.loadOfficeDepartment(officeId, this.departmentId);
      },
    });
  }

  loadOfficeDepartment(officeId: string, departmentId: string) {
    this.officedepartmentApi.getOfficeDepartment(officeId, departmentId).subscribe({
      next: (response) => {
        this.officeDepartmentId = response.data._id;

        this.loadAvailableDates();
      },

      error: console.error,
    });
  }
  loadAvailableDates() {
    this.slotApi.availableDates(this.officeDepartmentId).subscribe({
      next: (response) => {
        this.availableDates = response.data;
      },
    });
  }

  dateChanged(slotDate: string) {
    this.slotApi.availableTime(this.officeDepartmentId, slotDate.split('T')[0]).subscribe({
      next: (response) => {
        this.availableSlots = response.data;
      },
    });
  }

  deathCertificate(stepper: MatStepper) {
    if (
      this.firstFormGroup.invalid ||
      this.secondFormGroup.invalid ||
      this.thirdFormGroup.invalid
    ) {
      return;
    }

    const formData = new FormData();

    formData.append('deceasedAadharId', this.firstFormGroup.value.deceasedAadharId!);
    formData.append('placeofDate', this.firstFormGroup.value.deathPlace!);
    formData.append('dateOfDeath', this.firstFormGroup.value.deathdate!);
    formData.append('deceasedFatherName', this.firstFormGroup.value.deceasedFatherName!);
    formData.append('deceasedMotherName', this.firstFormGroup.value.deceasedMotherName!);
    formData.append('deathType', this.firstFormGroup.value.deathType!);

    formData.append('spouseAadharId', this.secondFormGroup.value.spouseAadharId!);

    formData.append('deceasedAadharCard', this.deceasedAadharCard);
    formData.append('spouseAadharCard', this.spouseAadharCard);
    formData.append('deceasedRationCard', this.deceasedRationCard);
    formData.append('deceasedPhoto', this.deceasedPhoto);
    formData.append('deceasedMedicalCertificate', this.deceasedMedicalCertificate);
    formData.append('deathType', this.firstFormGroup.value.deathType!);

    if (this.firstFormGroup.value.deathType === 'unnatural') {
      formData.append('pmReport', this.pmReport);
      formData.append('fir', this.fir);
    }

    this.deathApi.create(formData).subscribe({
      next: (response) => {
        console.log(formData);
        console.log(response);
        alert('Birth Certificate Applied Successfully');
        stepper.next();
        this.selectOffices(response.data.deathdistrict);
        this.deathServiceId = response.data._id;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  verifyDeceasedAadhar() {
    this.authApi
      .aadharDetail({
        aadharNumber: this.firstFormGroup.value.deceasedAadharNumber!,
      })
      .subscribe({
        next: (response) => this.onDeceasedAadharVerified(response),

        error: (err) => alert(err.error),
      });
  }

  verifySpouseAadhar() {
    this.authApi
      .aadharDetail({ aadharNumber: this.secondFormGroup.value.spouseAadharNumber! })
      .subscribe({
        next: (response) => this.onSpouseAadharVerified(response),
        error: (err) => alert(err.error),
      });
  }

  onDeceasedAadharVerified(event: Auth.Apis.AadharDetailResponse) {
    this.firstFormGroup.patchValue({
      deceasedAadharId: event.data._id,
      deceasedAadharNumber: event.data.aadharNumber,
      deceasedName: `${event.data.firstName} ${event.data.middleName ?? ''} ${event.data.lastName}`,
      deceasedBirthDate: new Date(event.data.dob),
      deceasedGender: event.data.gender,
      deceasedStreet: event.data.address.street,
      deceasedCity: event.data.address.city,
      deceasedSubDistrict: event.data.address.taluka,
      deceasedDistrict: event.data.address.district,
      deceasedState: event.data.address.state,
      deceasedPinCode: event.data.address.pinCode,
    });
  }

  onSpouseAadharVerified(event: Auth.Apis.AadharDetailResponse) {
    this.secondFormGroup.patchValue({
      spouseAadharId: event.data._id,
      spouseAadharNumber: event.data.aadharNumber,
      spouseName: `${event.data.firstName} ${event.data.middleName ?? ''} ${event.data.lastName}`,
      spouseBirthDate: new Date(event.data.dob),
      spouseGender: event.data.gender,
      spouseMobileNumber: event.data.contact,
      spouseStreet: event.data.address.street,
      spouseCity: event.data.address.city,
      spouseSubDistrict: event.data.address.taluka,
      spouseDistrict: event.data.address.district,
      spouseState: event.data.address.state,
      spousePinCode: event.data.address.pinCode,
    });
  }

  submitApplication() {
    if (this.fourthFormGroup.invalid) {
      this.fourthFormGroup.markAllAsTouched();
      return;
    }

    this.applicationApi
      .create({
        serviceId: this.deathServiceId,

        officeDepartmentId: this.officeDepartmentId,

        slotId: this.fourthFormGroup.value.slotTime!,

        serviceType: this.serviceType,
      })
      .subscribe({
        next: () => {
          alert('Application Submitted Successfully');

          this.router.navigate(['/user-dashboard']);
        },

        error: (err) => {
          console.log(err);
        },
      });
  }

  onFileSelected(event: Event, type: string) {
    event.preventDefault;

    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    if (type === 'deceased') {
      this.deceasedAadharCard = file;
      this.thirdFormGroup.patchValue({
        deceasedAadharCard: file,
      });
    }

    if (type === 'spouse') {
      this.spouseAadharCard = file;
      this.thirdFormGroup.patchValue({
        spouseAadharCard: file,
      });
    }

    if (type === 'rationCard') {
      this.deceasedRationCard = file;
      this.thirdFormGroup.patchValue({
        deceasedRationCard: file,
      });
    }
    if (type === 'photo') {
      this.deceasedPhoto = file;
      this.thirdFormGroup.patchValue({
        deceasedPhoto: file,
      });
    }

    if (type === 'medicalCertificate') {
      this.deceasedMedicalCertificate = file;
      this.thirdFormGroup.patchValue({
        deceasedMedicalCertificate: file,
      });
    }
    if (type === 'pmReport') {
      this.pmReport = file;
      this.thirdFormGroup.patchValue({
        pmReport: file,
      });
    }
    if (type === 'fir') {
      this.fir = file;
      this.thirdFormGroup.patchValue({
        fir: file,
      });
    }
  }

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 79, 0, 1);
  readonly maxDate = new Date(this._currentYear + 0, 11, 31);

  readonly slotMinDate = new Date(this._currentYear - 0, 0, 1);
  readonly slotMaxDate = new Date(this._currentYear + 1, 11, 31);
}
