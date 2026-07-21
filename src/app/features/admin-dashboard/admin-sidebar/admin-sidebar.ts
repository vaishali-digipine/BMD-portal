import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthApi } from '../../../@api/auth/auth.api';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {
  private authApi = inject(AuthApi);
  private router = inject(Router);

  logout() {
    this.authApi.logout().subscribe({
      next: (response) => {
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
