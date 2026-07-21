import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthApi } from '../../../@api/auth/auth.api';
import { Auth } from '../../../@api/auth/auth.type';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  private authApi = inject(AuthApi);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  profile: Auth.Apis.Profile | null = null;

  constructor() {
    this.getProfile();
  }

  getProfile() {
    this.authApi.profile().subscribe({
      next: (response) => {
        this.profile = response;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  logout() {
    this.authApi.logout().subscribe({
      next: (response) => {
        console.log(response.message);

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        this.router.navigate(['/signIn']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
