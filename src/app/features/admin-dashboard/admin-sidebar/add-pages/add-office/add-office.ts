import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

interface Districts {
  value: string;
  viewValue: string;
}

interface States {
  value: string;
  viewvalue: string;
}

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

  addOffice = new FormGroup({
    officeName: new FormControl('', [Validators.required]),
    districtName: new FormControl('', [Validators.required]),
    stateName: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<AddOffice>) {}

  closeDialog() {
    this.dialogRef.close();
  }

  districts: Districts[] = [{ value: '1', viewValue: 'Porbandar' }];

  states: States[] = [{ value: '1', viewvalue: 'Gujarat' }];
}
