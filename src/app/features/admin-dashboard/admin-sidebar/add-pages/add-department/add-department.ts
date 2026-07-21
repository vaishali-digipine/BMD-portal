import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DepartmentsApi } from '../../../../../@api/departments/departments.api';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatButtonModule, MatError],
  templateUrl: './add-department.html',
  styleUrl: './add-department.css',
})
export class AddDepartment {
  private router = inject(Router);
  private departmentApi = inject(DepartmentsApi);

  addDepartment = new FormGroup({
    departmentName: new FormControl('', [Validators.required]),
  });
  accessToken = '';

  saveDepartment() {
    if (this.addDepartment.invalid) return;

    this.departmentApi.create({ name: this.addDepartment.value.departmentName! }).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  constructor(private dialogRef: MatDialogRef<AddDepartment>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
