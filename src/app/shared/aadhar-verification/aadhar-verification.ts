import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Aadhar } from '../../@api/aadhars/aadhars.type';
import { AuthApi } from '../../@api/auth/auth.api';

@Component({
  selector: 'app-aadhar-verification',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './aadhar-verification.html',
  styleUrl: './aadhar-verification.css',
})
export class AadharVerification {
  @Input({ required: true }) aadharControl!: FormControl;

  otpControls = [
    new FormControl(''),
    new FormControl(''),
    new FormControl(''),
    new FormControl(''),
    new FormControl(''),
    new FormControl(''),
  ];

  @Output() verified = new EventEmitter<{
    verificationToken: string;
    data: Aadhar.Detail;
  }>();

  private authApi = inject(AuthApi);

  sendOtp() {
    if (this.aadharControl.invalid) {
      return alert('Invalid Aadhar Number');
    }
    this.authApi.requestOtp({ aadharNumber: this.aadharControl.value }).subscribe({
      next: (response) => {
        alert(response.message);
      },

      error: (err) => {
        alert('There is some issue in the sending OTP');
      },
    });
  }

  resendOtp() {
    this.sendOtp();
  }

  verifyOtp() {
    const otp = this.otpControls.map((control) => control.value).join('');

    if (otp.length !== 6) {
      alert('Please enter 6 digit OTP');
      return;
    }

    this.authApi.verifyOtp({ aadharNumber: this.aadharControl.value, otpNumber: otp }).subscribe({
      next: (response) => {
        // alert(response.message);

        this.verified.emit({
          verificationToken: response.verificationToken,
          data: response.data,
        });
      },

      error: (err) => {
        alert(err.error);
      },
    });
  }
}
