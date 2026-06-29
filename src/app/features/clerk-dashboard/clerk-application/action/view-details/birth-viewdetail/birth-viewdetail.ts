import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-birth-viewdetail',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCardModule,
    MatIconModule,

    MatInputModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './birth-viewdetail.html',
  styleUrl: './birth-viewdetail.css',
})
export class BirthViewdetail {}
