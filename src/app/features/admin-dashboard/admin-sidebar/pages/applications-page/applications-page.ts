import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ApplicationApi } from '../../../../../@api/applications/application.api';
import { Application, EServiceType } from '../../../../../@api/applications/applications.type';

@Component({
  selector: 'app-applications-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginator,
    TitleCasePipe,
  ],
  templateUrl: './applications-page.html',
  styleUrl: './applications-page.css',
})
export class ApplicationsPage {
  private applicationApi = inject(ApplicationApi);
  private router = inject(Router);

  displayedColumns: string[] = [
    'serialNo',
    'applicationNumber',
    'serviceType',
    'clerkName',
    'userName',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource<Application.Detail>([]);

  page = 1;
  limit = 5;
  search = '';
  total = 0;

  constructor() {
    this.getApplications();
  }

  getApplications() {
    this.applicationApi.list(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.total = response.pagination.totalDocuments;
      },
      error: console.error,
    });
  }

  viewDetails(application: Application.Detail) {
    if (application.serviceType === EServiceType.birth) {
      this.router.navigate(['/birth-viewdetail', application._id]);
    } else if (application.serviceType === EServiceType.marriage) {
      this.router.navigate(['/marriage-viewdetail', application._id]);
    } else if (application.serviceType === EServiceType.death) {
      this.router.navigate(['/death-viewdetail', application._id]);
    }
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getApplications();
  }

  searchDistrict(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.getApplications();
  }
}
