import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthApi } from '../../../@api/auth/auth.api';
import { Router } from '@angular/router';
import { Auth } from '../../../@api/auth/auth.type';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatMenuModule, DatePipe, TitleCasePipe],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css',
})
export class AdminProfile {
  private authApi = inject(AuthApi);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  profile: Auth.Apis.Profile | null = null;

  ngOnInit() {
    const token = localStorage.getItem('accessToken');

    if (token) {
      this.authApi.profile().subscribe({
        next: (data) => {
          this.profile = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Failed to load profile', err);
        },
      });
    } else {
      this.router.navigate(['/signIn']);
    }
  }
}
