import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatFormField,
  MatLabel,
  MatHint,
  MatError,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-remark-dialogbox',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './remark-dialogbox.html',
  styleUrl: './remark-dialogbox.css',
})
export class RemarkDialogbox {
  remarks = new FormControl('', [Validators.required, Validators.maxLength(300)]);

  dialogRef = inject(MatDialogRef<RemarkDialogbox>);

  cancel() {
    this.dialogRef.close();
  }

  submit() {
    if (this.remarks.invalid) {
      this.remarks.markAsTouched();
      return;
    }

    this.dialogRef.close(this.remarks.value);
  }
}
