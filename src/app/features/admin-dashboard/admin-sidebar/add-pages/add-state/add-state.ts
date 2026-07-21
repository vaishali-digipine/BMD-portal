import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { StatesApi } from '../../../../../@api/states/states.api';

@Component({
  selector: 'app-add-state',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './add-state.html',
  styleUrl: './add-state.css',
})
export class AddState {
  private router = inject(Router);
  private stateApi = inject(StatesApi);

  addState = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(12)]),
  });

  saveState() {
    if (this.addState.invalid) return;

    this.stateApi.create({ name: this.addState.value.name! }).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
    });
  }

  constructor(private dialogRef: MatDialogRef<AddState>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
