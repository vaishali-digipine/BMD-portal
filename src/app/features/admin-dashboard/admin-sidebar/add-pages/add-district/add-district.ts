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

interface State {
  value: string;
  viewValue: string;
}

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

  addDistrict = new FormGroup({
    stateName: new FormControl('', [Validators.required]),
    districtName: new FormControl('', [Validators.required]),
  });

  districts: Districts[] = [{ value: '1', viewValue: 'Porbandar' }];

  states: State[] = [{ value: '1', viewValue: 'Gujarat' }];

  constructor(private dialogRef: MatDialogRef<AddDistrict>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
