import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { PasswordField } from '../../../shared/password-field/password-field';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    PasswordField,
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {
  hide = signal(true);

  forgotPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSubmit() {}

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
