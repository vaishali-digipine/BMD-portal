import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

interface Departments {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatSelect, MatOption, MatButtonModule],
  templateUrl: './add-department.html',
  styleUrl: './add-department.css',
})
export class AddDepartment {
  private router = inject(Router);

  addDepartment = new FormGroup({
    departmentName: new FormControl('', [Validators.required]),
  });

  departments: Departments[] = [
    { value: '1', viewValue: 'Birth' },
    { value: '2', viewValue: 'Marriage' },
    { value: '3', viewValue: 'Death' },
  ];

  constructor(private dialogRef: MatDialogRef<AddDepartment>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
