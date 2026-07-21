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
import { BirthServicesApi } from '../../../../@api/birthService/birth-services.api';
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
  selector: 'app-birth-service',
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
    DatePipe,
    RouterLink,
    MatHint,
    MatTimepickerModule,
    MatStepperModule,
  ],
  templateUrl: './birth-service.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './birth-service.css',
})
export class BirthService {
  isLinear = true;

  private birthApi = inject(BirthServicesApi);

  private applicationApi = inject(ApplicationApi);

  private districtApi = inject(DistrictsApi);

  private officeApi = inject(OfficesApi);

  private authApi = inject(AuthApi);

  private departmentApi = inject(DepartmentsApi);

  private officedepartmentApi = inject(OfficeDepartmentsApi);

  private slotApi = inject(SlotApi);

  private router = inject(Router);

  firstFormGroup = new FormGroup({
    babyName: new FormControl('', [Validators.required]),
    birthTime: new FormControl('', [Validators.required]),
    birthPlace: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    districtId: new FormControl('', Validators.required),
  });

  secondFormGroup = new FormGroup({
    fatherName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fatherContactNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fatherEmail: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fatherBirthDate: new FormControl<Date | null>({ value: null, disabled: true }, [
      Validators.required,
    ]),
    fatherStreet: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fatherCity: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fatherSubDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fatherDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fatherState: new FormControl({ value: '', disabled: true }, [Validators.required]),
    fatherPinCode: new FormControl({ value: '', disabled: true }, [Validators.required]),

    fatherAadharId: new FormControl('', Validators.required),
    fatherAadharNumber: new FormControl('', Validators.required),

    motherAadharId: new FormControl('', Validators.required),
    motherAadharNumber: new FormControl('', Validators.required),
    motherName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    motherContactNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
    motherEmail: new FormControl({ value: '', disabled: true }, [Validators.required]),
    motherBirthDate: new FormControl<Date | null>({ value: null, disabled: true }, [
      Validators.required,
    ]),
    motherStreet: new FormControl({ value: '', disabled: true }, [Validators.required]),
    motherCity: new FormControl({ value: '', disabled: true }, [Validators.required]),
    motherSubDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    motherDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    motherState: new FormControl({ value: '', disabled: true }, [Validators.required]),
    motherPinCode: new FormControl({ value: '', disabled: true }, [Validators.required]),

    PermanentStreet: new FormControl({ value: '', disabled: true }, [Validators.required]),
    PermanentCity: new FormControl({ value: '', disabled: true }, [Validators.required]),
    PermanentSubDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    PermanentDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    PermanentState: new FormControl({ value: '', disabled: true }, [Validators.required]),
    PermanentPinCode: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  thirdFormGroup = new FormGroup({
    fatherAadharCard: new FormControl<File | null>(null, Validators.required),
    motherAadharCard: new FormControl<File | null>(null, Validators.required),
    marriageCertificate: new FormControl<File | null>(null, Validators.required),
    birthHospitalReport: new FormControl<File | null>(null, Validators.required),
    rationCard: new FormControl<File | null>(null, Validators.required),
  });

  fourthFormGroup = new FormGroup({
    slotDate: new FormControl('', [Validators.required]),
    officeId: new FormControl('', [Validators.required]),
    slotTime: new FormControl('', [Validators.required]),
  });

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 79, 0, 1);
  readonly maxDate = new Date(this._currentYear + 0, 11, 31);

  readonly slotMinDate = new Date(this._currentYear - 0, 0, 1);
  readonly slotMaxDate = new Date(this._currentYear + 1, 11, 31);

  fatherAadharCard!: File;
  motherAadharCard!: File;
  marriageCertificate!: File;
  birthHospitalReport!: File;
  rationCard!: File;

  departmentId = '';
  officeDepartmentId = '';
  selectedSlotId = '';

  availableDates: string[] = [];

  availableSlots: Slot.Base[] = [];

  districts: District.Base[] = [];

  offices: Office.Detail[] = [];

  birthServiceId = '';
  serviceType: any;

  constructor() {
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
    this.departmentApi.getDepartment('birth').subscribe({
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

  onFileSelected(event: Event, type: string) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    if (type === 'father') {
      this.fatherAadharCard = file;
      this.thirdFormGroup.patchValue({
        fatherAadharCard: file,
      });
    }

    if (type === 'mother') {
      this.motherAadharCard = file;
      this.thirdFormGroup.patchValue({
        motherAadharCard: file,
      });
    }

    if (type === 'marriage') {
      this.marriageCertificate = file;
      this.thirdFormGroup.patchValue({
        marriageCertificate: file,
      });
    }

    if (type === 'hospital') {
      this.birthHospitalReport = file;
      this.thirdFormGroup.patchValue({
        birthHospitalReport: file,
      });
    }

    if (type === 'ration') {
      this.rationCard = file;
      this.thirdFormGroup.patchValue({
        rationCard: file,
      });
    }
  }

  birthCertificate(stepper: MatStepper) {
    if (
      this.firstFormGroup.invalid ||
      this.secondFormGroup.invalid ||
      this.thirdFormGroup.invalid
    ) {
      return;
    }

    const formData = new FormData();

    formData.append('birthName', this.firstFormGroup.value.babyName!);
    formData.append('birthDate', this.firstFormGroup.value.birthDate!);
    formData.append('birthTime', this.firstFormGroup.value.birthTime!);
    formData.append('birthDistrict', this.firstFormGroup.value.districtId!);
    formData.append('birthPlace', this.firstFormGroup.value.birthPlace!);
    formData.append('birthGender', this.firstFormGroup.value.gender!);
    formData.append('birthWeight', this.firstFormGroup.value.weight!);

    formData.append('fatherAadharId', this.secondFormGroup.value.fatherAadharId!);
    formData.append('motherAadharId', this.secondFormGroup.value.motherAadharId!);

    formData.append('fatherAadharCard', this.fatherAadharCard);
    formData.append('motherAadharCard', this.motherAadharCard);
    formData.append('marriageCertificate', this.marriageCertificate);
    formData.append('birthHospitalReport', this.birthHospitalReport);
    formData.append('rationCard', this.rationCard);

    this.birthApi.create(formData).subscribe({
      next: (response) => {
        alert('Birth Certificate Applied Successfully');
        stepper.next();
        this.selectOffices(response.data.birthDistrict);
        this.birthServiceId = response.data._id;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  verifyFatherAadhar() {
    this.authApi
      .aadharDetail({
        aadharNumber: this.secondFormGroup.value.fatherAadharNumber!,
      })
      .subscribe({
        next: (response) => this.onFatherAadharVerified(response),

        error: (err) => alert(err.error),
      });
  }

  verifyMotherAadhar() {
    this.authApi
      .aadharDetail({ aadharNumber: this.secondFormGroup.value.motherAadharNumber! })
      .subscribe({
        next: (response) => this.onMotherAadharVerified(response),
        error: (err) => alert(err.error),
      });
  }

  onFatherAadharVerified(event: Auth.Apis.AadharDetailResponse) {
    this.secondFormGroup.patchValue({
      fatherAadharId: event.data._id,
      fatherAadharNumber: event.data.aadharNumber,
      fatherName: `${event.data.firstName} ${event.data.middleName ?? ''} ${event.data.lastName}`,
      fatherEmail: event.data.email,
      fatherContactNumber: event.data.contact,
      fatherBirthDate: new Date(event.data.dob),
      fatherStreet: event.data.address.street,
      fatherCity: event.data.address.city,
      fatherSubDistrict: event.data.address.taluka,
      fatherDistrict: event.data.address.district,
      fatherState: event.data.address.state,
      fatherPinCode: event.data.address.pinCode,

      PermanentStreet: event.data.address.street,
      PermanentCity: event.data.address.city,
      PermanentSubDistrict: event.data.address.taluka,
      PermanentDistrict: event.data.address.district,
      PermanentState: event.data.address.state,
      PermanentPinCode: event.data.address.pinCode,
    });
  }

  onMotherAadharVerified(event: Auth.Apis.AadharDetailResponse) {
    this.secondFormGroup.patchValue({
      motherAadharId: event.data._id,
      motherAadharNumber: event.data.aadharNumber,
      motherName: `${event.data.firstName} ${event.data.middleName ?? ''} ${event.data.lastName}`,
      motherEmail: event.data.email,
      motherContactNumber: event.data.contact,
      motherBirthDate: new Date(event.data.dob),
      motherStreet: event.data.address.street,
      motherCity: event.data.address.city,
      motherSubDistrict: event.data.address.taluka,
      motherDistrict: event.data.address.district,
      motherState: event.data.address.state,
      motherPinCode: event.data.address.pinCode,
    });
  }

  submitApplication() {
    if (this.fourthFormGroup.invalid) {
      this.fourthFormGroup.markAllAsTouched();
      return;
    }

    this.applicationApi
      .create({
        serviceId: this.birthServiceId,

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
}
