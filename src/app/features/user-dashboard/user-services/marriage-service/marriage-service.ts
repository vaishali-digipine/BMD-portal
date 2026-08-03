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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AadharVerification } from '../../../../shared/aadhar-verification/aadhar-verification';
import { EmailField } from '../../../../shared/email-field/email-field';
import { Slot } from '../../../../@api/slots/slots.type';
import { District } from '../../../../@api/districts/districts.type';
import { Office } from '../../../../@api/offices/offices.type';
import { MarriageServiceApi } from '../../../../@api/marriageService/marriage-service.api';
import { ApplicationApi } from '../../../../@api/applications/application.api';
import { DistrictsApi } from '../../../../@api/districts/districts.api';
import { OfficesApi } from '../../../../@api/offices/offices.api';
import { AuthApi } from '../../../../@api/auth/auth.api';
import { DepartmentsApi } from '../../../../@api/departments/departments.api';
import { OfficeDepartmentsApi } from '../../../../@api/officeDepartments/office-departments.api';
import { SlotApi } from '../../../../@api/slots/slot.api';
import { Auth } from '../../../../@api/auth/auth.type';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MarriageService as MarriageTypes } from '../../../../@api/marriageService/marriageService.type';

@Component({
  selector: 'app-marriage-service',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatHint,
    MatStepperModule,
    MatTimepickerModule,
    DatePipe,
    AadharVerification,
    MatProgressSpinnerModule,
  ],
  templateUrl: './marriage-service.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './marriage-service.css',
})
export class MarriageService {
  isLinear = true;
  stepIndex = 0;

  private marriageApi = inject(MarriageServiceApi);

  private applicationApi = inject(ApplicationApi);

  private districtApi = inject(DistrictsApi);

  private officeApi = inject(OfficesApi);

  private authApi = inject(AuthApi);

  private departmentApi = inject(DepartmentsApi);

  private officedepartmentApi = inject(OfficeDepartmentsApi);

  private slotApi = inject(SlotApi);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  firstFormGroup = new FormGroup({
    brideAadharNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
    brideAadharId: new FormControl('', [Validators.required]),
    brideName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    brideFatherName: new FormControl('', [Validators.required]),
    brideMotherName: new FormControl('', [Validators.required]),
    brideBirthDate: new FormControl<Date | null>({ value: null, disabled: true }, [
      Validators.required,
    ]),
    brideEmail: new FormControl({ value: '', disabled: true }, [Validators.required]),
    brideMobileNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
    brideGender: new FormControl({ value: '', disabled: true }, [Validators.required]),
    brideStreet: new FormControl({ value: '', disabled: true }, [Validators.required]),
    brideCity: new FormControl({ value: '', disabled: true }, [Validators.required]),
    brideSubDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    brideDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    brideState: new FormControl({ value: '', disabled: true }, [Validators.required]),
    bridePinCode: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  secondFormGroup = new FormGroup({
    groomAadharNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
    groomAadharId: new FormControl('', [Validators.required]),
    groomName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    groomFatherName: new FormControl('', [Validators.required]),
    groomMotherName: new FormControl('', [Validators.required]),
    groomBirthDate: new FormControl<Date | null>({ value: null, disabled: true }, [
      Validators.required,
    ]),
    groomEmail: new FormControl({ value: '', disabled: true }, [Validators.required]),
    groomMobileNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
    groomGender: new FormControl({ value: '', disabled: true }, [Validators.required]),
    groomStreet: new FormControl({ value: '', disabled: true }, [Validators.required]),
    groomCity: new FormControl({ value: '', disabled: true }, [Validators.required]),
    groomSubDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    groomDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    groomState: new FormControl({ value: '', disabled: true }, [Validators.required]),
    groomPinCode: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  thirdFormGroup = new FormGroup({
    marriageDate: new FormControl<Date | string | null>(null, [Validators.required]),
    marriagePlace: new FormControl('', [Validators.required]),
    districtId: new FormControl('', [Validators.required]),
  });

  fourthFormGroup = new FormGroup({
    witnessAadharNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
    witnessAadharId: new FormControl('', [Validators.required]),
    witnessName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    witnessMobileNumber: new FormControl({ value: '', disabled: true }, [Validators.required]),
    witnessEmail: new FormControl({ value: '', disabled: true }, [Validators.required]),
    witnessRelation: new FormControl('', [Validators.required]),
    witnessGender: new FormControl({ value: '', disabled: true }, [Validators.required]),
    witnessStreet: new FormControl({ value: '', disabled: true }, [Validators.required]),
    witnessCity: new FormControl({ value: '', disabled: true }, [Validators.required]),
    witnessSubDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    witnessDistrict: new FormControl({ value: '', disabled: true }, [Validators.required]),
    witnessState: new FormControl({ value: '', disabled: true }, [Validators.required]),
    witnessPinCode: new FormControl({ value: '', disabled: true }, [Validators.required]),

    brahmanAadharNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
    brahmanAadharId: new FormControl('', [Validators.required]),
    brahmanName: new FormControl({ value: '', disabled: true }, [Validators.required]),
    brahmanMobileNo: new FormControl({ value: '', disabled: true }, [Validators.required]),
  });

  fifthFormGroup = new FormGroup({
    brideAadharCard: new FormControl<File | null>(null, Validators.required),
    groomAadharCard: new FormControl<File | null>(null, Validators.required),
    witnessAadharCard: new FormControl<File | null>(null, Validators.required),
    brahmanAadharCard: new FormControl<File | null>(null, Validators.required),
    brideRationCard: new FormControl<File | null>(null, Validators.required),
    groomRationCard: new FormControl<File | null>(null, Validators.required),
    bridePhoto: new FormControl<File | null>(null, Validators.required),
    groomPhoto: new FormControl<File | null>(null, Validators.required),
    invitationCard: new FormControl<File | null>(null, Validators.required),
  });

  sixthFormGroup = new FormGroup({
    slotDate: new FormControl('', [Validators.required]),
    officeId: new FormControl('', [Validators.required]),
    slotTime: new FormControl('', [Validators.required]),
  });

  brideAadharCard!: File;
  groomAadharCard!: File;
  witnessAadharCard!: File;
  brahmanAadharCard!: File;
  brideRationCard!: File;
  groomRationCard!: File;
  bridePhoto!: File;
  groomPhoto!: File;
  invitationCard!: File;

  applicationId = '';
  departmentId = '';
  officeDepartmentId = '';
  selectedSlotId = '';

  availableDates: string[] = [];

  availableSlots: Slot.Base[] = [];

  districts: District.Base[] = [];

  offices: Office.Detail[] = [];

  marriageServiceId = '';
  serviceType: any;

  isDraft = false;
  isApplicationSubmitting = false;

  constructor() {
    this.selectDistricts();

    this.route.queryParams.subscribe((params) => {
      if (params['applicationId']) {
        this.isDraft = true;
        this.loadDraft(params['applicationId']);
      }
    });
  }

  loadDraft(applicationId: string) {
    this.applicationApi.getById(applicationId).subscribe({
      next: (response) => {
        const application = response.data;
        const marriage = application.serviceId as MarriageTypes.Detail;

        this.applicationId = application._id;
        this.marriageServiceId = marriage._id;

        this.firstFormGroup.patchValue({
          brideAadharId: marriage.brideAadharId._id,
          brideAadharNumber: marriage.brideAadharId.aadharNumber,
          brideFatherName: marriage.brideFatherName,
          brideMotherName: marriage.brideMotherName,
        });

        this.secondFormGroup.patchValue({
          groomAadharId: marriage.groomAadharId._id,
          groomAadharNumber: marriage.groomAadharId.aadharNumber,
          groomFatherName: marriage.groomFatherName,
          groomMotherName: marriage.groomMotherName,
        });

        this.thirdFormGroup.patchValue({
          marriageDate: marriage.marriageDate,
          marriagePlace: marriage.marriagePlace,
          districtId: marriage.marriageDistrict._id,
        });

        this.fourthFormGroup.patchValue({
          witnessAadharId: marriage.witnessAadharId._id,
          witnessAadharNumber: marriage.witnessAadharId.aadharNumber,
          witnessRelation: marriage.witnessRelation,

          brahmanAadharId: marriage.brahmanAadharId._id,
          brahmanAadharNumber: marriage.brahmanAadharId.aadharNumber,
        });

        this.onBrideAadharVerified({
          data: marriage.brideAadharId,
        } as Auth.Apis.AadharDetailResponse);

        this.onGroomAadharVerified({
          data: marriage.groomAadharId,
        } as Auth.Apis.AadharDetailResponse);

        this.onWitnessAadharVerified({
          data: marriage.witnessAadharId,
        } as Auth.Apis.AadharDetailResponse);

        this.onBrahmanAadharVerified({
          data: marriage.brahmanAadharId,
        } as Auth.Apis.AadharDetailResponse);

        this.selectOffices(marriage.marriageDistrict._id);

        this.stepIndex = 5;
      },
      error: (err) => {
        console.error(err);
      },
    });
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

    this.sixthFormGroup.patchValue({
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
    this.departmentApi.getDepartment('marriage').subscribe({
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

  marriageCertificate(stepper: MatStepper) {
    if (
      this.firstFormGroup.invalid ||
      this.secondFormGroup.invalid ||
      this.thirdFormGroup.invalid ||
      this.fourthFormGroup.invalid ||
      this.fifthFormGroup.invalid
    ) {
      return;
    }

    const formData = new FormData();

    formData.append('brideAadharId', this.firstFormGroup.value.brideAadharId!);
    formData.append('brideFatherName', this.firstFormGroup.value.brideFatherName!);
    formData.append('brideMotherName', this.firstFormGroup.value.brideMotherName!);

    formData.append('groomAadharId', this.secondFormGroup.value.groomAadharId!);
    formData.append('groomFatherName', this.secondFormGroup.value.groomFatherName!);
    formData.append('groomMotherName', this.secondFormGroup.value.groomMotherName!);

    formData.append('marriageDate', this.thirdFormGroup.value.marriageDate!.toString());
    formData.append('marriagePlace', this.thirdFormGroup.value.marriagePlace!);
    formData.append('marriageDistrict', this.thirdFormGroup.value.districtId!);

    formData.append('witnessAadharId', this.fourthFormGroup.value.witnessAadharId!);
    formData.append('brahmanAadharId', this.fourthFormGroup.value.brahmanAadharId!);
    formData.append('witnessRelation', this.fourthFormGroup.value.witnessRelation!);

    formData.append('brideAadharCard', this.brideAadharCard);
    formData.append('groomAadharCard', this.groomAadharCard);
    formData.append('witnessAadharCard', this.witnessAadharCard);
    formData.append('brahmanAadharCard', this.brahmanAadharCard);
    formData.append('brideRationCard', this.brideRationCard);
    formData.append('groomRationCard', this.groomRationCard);
    formData.append('bridePhoto', this.bridePhoto);
    formData.append('groomPhoto', this.groomPhoto);
    formData.append('invitationCard', this.invitationCard);

    this.marriageApi.create(formData).subscribe({
      next: (response) => {
        alert('Marriage Certificate Applied Successfully');
        const marriage = response.data.marriage;

        this.marriageServiceId = marriage._id;

        this.selectOffices(marriage.marriageDistrict);
        this.applicationId = response.data.application._id;

        stepper.next();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onBrideAadharVerified(event: Auth.Apis.AadharDetailResponse) {
    this.firstFormGroup.patchValue({
      brideAadharId: event.data._id,
      brideAadharNumber: event.data.aadharNumber,
      brideName: `${event.data.firstName} ${event.data.middleName ?? ''} ${event.data.lastName}`,
      brideEmail: event.data.email,
      brideMobileNumber: event.data.contact,
      brideBirthDate: new Date(event.data.dob),
      brideGender: event.data.gender,
      brideStreet: event.data.address.street,
      brideCity: event.data.address.city,
      brideSubDistrict: event.data.address.taluka,
      brideDistrict: event.data.address.district,
      brideState: event.data.address.state,
      bridePinCode: event.data.address.pinCode,
    });
    if (
      this.firstFormGroup.value.brideAadharNumber === this.secondFormGroup.value.groomAadharNumber
    ) {
      this.firstFormGroup.controls.brideAadharNumber.setErrors({ sameAadhar: true });
      this.secondFormGroup.controls.groomAadharNumber.setErrors({ sameAadhar: true });
    }
  }

  onGroomAadharVerified(event: Auth.Apis.AadharDetailResponse) {
    this.secondFormGroup.patchValue({
      groomAadharId: event.data._id,
      groomAadharNumber: event.data.aadharNumber,
      groomName: `${event.data.firstName} ${event.data.middleName ?? ''} ${event.data.lastName}`,
      groomEmail: event.data.email,
      groomMobileNumber: event.data.contact,
      groomBirthDate: new Date(event.data.dob),
      groomGender: event.data.gender,
      groomStreet: event.data.address.street,
      groomCity: event.data.address.city,
      groomSubDistrict: event.data.address.taluka,
      groomDistrict: event.data.address.district,
      groomState: event.data.address.state,
      groomPinCode: event.data.address.pinCode,
    });
    if (
      this.secondFormGroup.value.groomAadharNumber === this.firstFormGroup.value.brideAadharNumber
    ) {
      this.secondFormGroup.controls.groomAadharNumber.setErrors({ sameAadhar: true });
      this.firstFormGroup.controls.brideAadharNumber.setErrors({ sameAadhar: true });
    }
  }
  onWitnessAadharVerified(event: Auth.Apis.AadharDetailResponse) {
    this.fourthFormGroup.patchValue({
      witnessAadharId: event.data._id,
      witnessAadharNumber: event.data.aadharNumber,
      witnessName: `${event.data.firstName} ${event.data.middleName ?? ''} ${event.data.lastName}`,
      witnessEmail: event.data.email,
      witnessMobileNumber: event.data.contact,
      witnessGender: event.data.gender,
      witnessStreet: event.data.address.street,
      witnessCity: event.data.address.city,
      witnessSubDistrict: event.data.address.taluka,
      witnessDistrict: event.data.address.district,
      witnessState: event.data.address.state,
      witnessPinCode: event.data.address.pinCode,
    });

    if (
      this.fourthFormGroup.value.witnessAadharNumber === this.firstFormGroup.value.brideAadharNumber
    ) {
      this.fourthFormGroup.controls.witnessAadharNumber.setErrors({ sameAadhar: true });
      this.firstFormGroup.controls.brideAadharNumber.setErrors({ sameAadhar: true });
    }

    if (
      this.fourthFormGroup.value.witnessAadharNumber ===
      this.secondFormGroup.value.groomAadharNumber
    ) {
      this.fourthFormGroup.controls.witnessAadharNumber.setErrors({ sameAadhar: true });
      this.secondFormGroup.controls.groomAadharNumber.setErrors({ sameAadhar: true });
    }
  }
  onBrahmanAadharVerified(event: Auth.Apis.AadharDetailResponse) {
    this.fourthFormGroup.patchValue({
      brahmanAadharId: event.data._id,
      brahmanAadharNumber: event.data.aadharNumber,
      brahmanName: `${event.data.firstName} ${event.data.middleName ?? ''} ${event.data.lastName}`,
      brahmanMobileNo: event.data.contact,
    });
    if (
      this.fourthFormGroup.value.brahmanAadharNumber === this.firstFormGroup.value.brideAadharNumber
    ) {
      this.fourthFormGroup.controls.brahmanAadharNumber.setErrors({ sameAadhar: true });
      this.firstFormGroup.controls.brideAadharNumber.setErrors({ sameAadhar: true });
    }

    if (
      this.fourthFormGroup.value.brahmanAadharNumber ===
      this.secondFormGroup.value.groomAadharNumber
    ) {
      this.fourthFormGroup.controls.brahmanAadharNumber.setErrors({ sameAadhar: true });
      this.secondFormGroup.controls.groomAadharNumber.setErrors({ sameAadhar: true });
    }

    if (
      this.fourthFormGroup.value.brahmanAadharNumber ===
      this.fourthFormGroup.value.witnessAadharNumber
    ) {
      this.fourthFormGroup.controls.brahmanAadharNumber.setErrors({ sameAadhar: true });
      this.fourthFormGroup.controls.witnessAadharNumber.setErrors({ sameAadhar: true });
    }
  }

  submitApplication() {
    if (this.fourthFormGroup.invalid) {
      this.fourthFormGroup.markAllAsTouched();
      return;
    }
    this.isApplicationSubmitting = true;
    this.applicationApi
      .completeApplication(this.applicationId, {
        officeDepartmentId: this.officeDepartmentId,
        slotId: this.sixthFormGroup.value.slotTime!,
      })
      .subscribe({
        next: () => {
          this.isApplicationSubmitting = false;
          alert('Application Submitted Successfully');

          this.router.navigate(['/user-dashboard']);
        },

        error: (err) => {
          this.isApplicationSubmitting = false;
          console.log(err);
        },
      });
  }

  onFileSelected(event: Event, type: string) {
    event.preventDefault();

    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    if (type === 'bride') {
      this.brideAadharCard = file;
      this.fifthFormGroup.patchValue({
        brideAadharCard: file,
      });
    }
    if (type === 'groom') {
      this.groomAadharCard = file;
      this.fifthFormGroup.patchValue({
        groomAadharCard: file,
      });
    }

    if (type === 'witness') {
      this.witnessAadharCard = file;
      this.fifthFormGroup.patchValue({
        witnessAadharCard: file,
      });
    }

    if (type === 'brahman') {
      this.brahmanAadharCard = file;
      this.fifthFormGroup.patchValue({
        brahmanAadharCard: file,
      });
    }

    if (type === 'brideRation') {
      this.brideRationCard = file;
      this.fifthFormGroup.patchValue({
        brideRationCard: file,
      });
    }

    if (type === 'groomRation') {
      this.groomRationCard = file;
      this.fifthFormGroup.patchValue({
        groomRationCard: file,
      });
    }

    if (type === 'bridePhoto') {
      this.bridePhoto = file;
      this.fifthFormGroup.patchValue({
        bridePhoto: file,
      });
    }
    if (type === 'groomPhoto') {
      this.groomPhoto = file;
      this.fifthFormGroup.patchValue({
        groomPhoto: file,
      });
    }
    if (type === 'invitationCard') {
      this.invitationCard = file;
      this.fifthFormGroup.patchValue({
        invitationCard: file,
      });
    }
  }

  private readonly _currentYear = new Date().getFullYear();
  readonly minDate = new Date(this._currentYear - 79, 0, 1);
  readonly maxDate = new Date();

  readonly slotMinDate = new Date(this._currentYear - 0, 0, 1);
  readonly slotMaxDate = new Date(this._currentYear + 1, 11, 31);
}
