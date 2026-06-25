import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Footer } from '../../../shared/footer/footer';

@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatTabGroup,
    MatTab,
    MatTabsModule,
    Footer,
  ],
  templateUrl: './user-home-page.html',
  styleUrl: './user-home-page.css',
})
export class UserHomePage {}
