import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
