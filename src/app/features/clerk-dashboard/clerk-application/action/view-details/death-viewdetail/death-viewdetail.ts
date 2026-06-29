import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-death-viewdetail',
  standalone: true,
  imports: [MatCard, MatIcon, MatCardContent, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './death-viewdetail.html',
  styleUrl: './death-viewdetail.css',
})
export class DeathViewdetail {}
