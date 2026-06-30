import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-marriage-viewdetail',
  standalone: true,
  imports: [MatCard, MatIcon, MatCardContent, MatInputModule, RouterLink, MatButtonModule],
  templateUrl: './marriage-viewdetail.html',
  styleUrl: './marriage-viewdetail.css',
})
export class MarriageViewdetail {}
