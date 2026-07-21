import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Router, RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ApplicationApi } from '../../../@api/applications/application.api';
import {
  Application,
  EApplicationStatus,
  EServiceType,
} from '../../../@api/applications/applications.type';

@Component({
  selector: 'app-clerk-application',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTimepickerModule,
    MatPaginatorModule,
    TitleCasePipe,
    DatePipe,
  ],
  templateUrl: './clerk-application.html',

  styleUrl: './clerk-application.css',
})
export class ClerkApplication {
  private applicationApi = inject(ApplicationApi);
  private router = inject(Router);

  displayedColumns = ['serialNo', 'applicationNumber', 'serviceType', 'date', 'status', 'action'];
  dataSource = new MatTableDataSource<Application.Detail>([]);

  page = 1;
  limit = 10;
  search = '';
  total = 0;
  totalApplications = 0;
  pending = 0;
  accepted = 0;
  rejected = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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

  searchState(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.getApplications();
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

  acceptApplication(application: Application.Detail) {
    this.applicationApi
      .update(application._id, {
        status: EApplicationStatus.accepted,
      })
      .subscribe({
        next: () => {
          application.status = EApplicationStatus.accepted;
        },
        error: console.error,
      });
  }

  rejectApplication(application: Application.Detail) {
    const remarks = prompt('Enter rejection remarks');

    if (!remarks) {
      return;
    }

    this.applicationApi
      .update(application._id, {
        status: EApplicationStatus.rejected,
        remarks,
      })
      .subscribe({
        next: () => {
          application.status = EApplicationStatus.rejected;
          application.remarks = remarks;
        },
        error: console.error,
      });
  }

  pendingApplication(application: Application.Detail) {
    this.applicationApi
      .update(application._id, {
        status: EApplicationStatus.pending,
      })
      .subscribe({
        next: () => {
          application.status = EApplicationStatus.pending;
        },
        error: console.error,
      });
  }
}
