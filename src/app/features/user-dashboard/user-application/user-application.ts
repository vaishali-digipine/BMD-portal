import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ApplicationApi } from '../../../@api/applications/application.api';
import { Application, EApplicationStatus } from '../../../@api/applications/applications.type';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-application',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatIcon,
    MatMenuModule,
    TitleCasePipe,
    DatePipe,
  ],
  templateUrl: './user-application.html',
  styleUrl: './user-application.css',
})
export class UserApplication {
  private applicationApi = inject(ApplicationApi);

  displayedColumns = ['serialNo', 'applicationNumber', 'serviceType', 'date', 'status', 'action'];

  dataSource = new MatTableDataSource<Application.Detail>([]);

  page = 1;
  limit = 10;
  search = '';
  totalApplications = 0;
  pending = 0;
  accepted = 0;
  rejected = 0;

  pendingApplications: Application.Detail[] = [];
  latestApplications: Application.Detail[] = [];

  constructor() {
    this.getApplications();
  }

  getApplications() {
    this.applicationApi.list(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
      },
      error: console.error,
    });
  }
}
