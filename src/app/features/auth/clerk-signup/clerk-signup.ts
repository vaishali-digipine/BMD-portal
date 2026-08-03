import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { PasswordField } from '../../../shared/password-field/password-field';
import { EmailField } from '../../../shared/email-field/email-field';
import { AadharVerification } from '../../../shared/aadhar-verification/aadhar-verification';
import { AuthApi } from '../../../@api/auth/auth.api';
import { StatesApi } from '../../../@api/states/states.api';
import { DepartmentsApi } from '../../../@api/departments/departments.api';
import { DistrictsApi } from '../../../@api/districts/districts.api';
import { State } from '../../../@api/states/states.type';
import { District } from '../../../@api/districts/districts.type';
import { Department } from '../../../@api/departments/departments.type';
import { Office } from '../../../@api/offices/offices.type';
import { OfficesApi } from '../../../@api/offices/offices.api';
import { Auth } from '../../../@api/auth/auth.type';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-clerk-signup',
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
    MatDatepickerToggle,
    MatHint,
    RouterLink,
    MatProgressSpinnerModule,
    EmailField,
    AadharVerification,
  ],
  templateUrl: './clerk-signup.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './clerk-signup.css',
})
export class ClerkSignup {
  hide = signal(true);
  isLoading = false;

  private router = inject(Router);
  private authApi = inject(AuthApi);
  private stateApi = inject(StatesApi);
  private departmentApi = inject(DepartmentsApi);
  private districtApi = inject(DistrictsApi);
  private officeApi = inject(OfficesApi);

  setPasswordToken = '';
  aadharFile!: File;
  signatureFile!: File;
  employeeCardFile!: File;

  clerkSignUpForm = new FormGroup({
    aadharNumber: new FormControl('', [Validators.required, Validators.minLength(12)]),
    employeeId: new FormControl(''),
    clerkName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    mobileNo: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(10),
    ]),
    gender: new FormControl({ value: '', disabled: true }, [Validators.required]),
    dateOfBirth: new FormControl<Date | null>({ value: null, disabled: true }, Validators.required),
    aadharCard: new FormControl<File | null>(null, Validators.required),
    govEmployeeIdCard: new FormControl<File | null>(null, Validators.required),

    signature: new FormControl<File | null>(null, Validators.required),
    stateId: new FormControl('', Validators.required),

    districtId: new FormControl('', Validators.required),

    officeId: new FormControl('', Validators.required),

    departmentId: new FormControl('', Validators.required),
  });

  states: State.Detail[] = [];

  districts: District.Base[] = [];

  departments: Department.Detail[] = [];

  offices: Office.Detail[] = [];
  verificationToken = '';

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 79, 0, 1);
  readonly maxDate = new Date(this._currentYear + 0, 11, 31);

  onClerkSignUp() {
    if (this.clerkSignUpForm.invalid) {
      this.clerkSignUpForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    formData.append('verificationToken', this.verificationToken);

    formData.append('stateId', this.clerkSignUpForm.value.stateId!);
    formData.append('districtId', this.clerkSignUpForm.value.districtId!);
    formData.append('officeId', this.clerkSignUpForm.value.officeId!);
    formData.append('departmentId', this.clerkSignUpForm.value.departmentId!);

    formData.append('aadharCard', this.aadharFile);
    formData.append('signature', this.signatureFile);
    formData.append('govEmployeeIdCard', this.employeeCardFile);

    this.authApi.registerClerk(formData).subscribe({
      next: (response) => {
        this.isLoading = false;
        alert('Clerk Registered Successfully');
        this.router.navigate(['/clerk-homepage']);
      },
      error: (error) => {
        this.isLoading = false;
        alert(error.error.message);
      },
    });
  }

  onAadharVerified(event: Auth.Apis.VerifyOtpResponse) {
    this.verificationToken = event.verificationToken;
    console.log(event);
    console.log(event.verificationToken);
    this.clerkSignUpForm.patchValue({
      clerkName: `${event.data.firstName} ${event.data.middleName ?? ''} ${event.data.lastName}`,

      email: event.data.email,

      mobileNo: event.data.contact,

      gender: event.data.gender,

      dateOfBirth: new Date(event.data.dob),
    });
  }

  constructor() {
    this.selectStates();

    this.selectDepatments();
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

    this.clerkSignUpForm.patchValue({
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

    this.clerkSignUpForm.patchValue({
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

  selectDepatments() {
    this.departmentApi.selectDepartment().subscribe({
      next: (response) => {
        this.departments = response.data;
      },
    });
  }
  onFileSelected(event: any, type: string) {
    const file = event.target.files[0];

    if (!file) return;

    switch (type) {
      case 'aadhar':
        this.aadharFile = file;

        this.clerkSignUpForm.patchValue({
          aadharCard: file,
        });

        break;

      case 'employee':
        this.employeeCardFile = file;

        this.clerkSignUpForm.patchValue({
          govEmployeeIdCard: file,
        });

        break;

      case 'signature':
        this.signatureFile = file;

        this.clerkSignUpForm.patchValue({
          signature: file,
        });

        break;
    }
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
