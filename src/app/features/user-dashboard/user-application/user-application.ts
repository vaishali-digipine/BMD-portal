import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApplicationApi } from '../../../@api/applications/application.api';
import {
  Application,
  EApplicationStatus,
  EServiceType,
} from '../../../@api/applications/applications.type';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
    MatPaginatorModule,
  ],
  templateUrl: './user-application.html',
  styleUrl: './user-application.css',
})
export class UserApplication {
  private applicationApi = inject(ApplicationApi);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  displayedColumns = ['serialNo', 'applicationNumber', 'serviceType', 'date', 'status', 'action'];

  dataSource = new MatTableDataSource<Application.Detail>([]);

  page = 1;
  limit = 10;
  search = '';
  totalApplications = 0;
  pending = 0;
  accepted = 0;
  rejected = 0;
  total = 0;

  constructor() {
    this.getApplications();
    this.loadCards();
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

  loadCards() {
    this.applicationApi.list(this.page, this.limit, '').subscribe((res) => {
      this.totalApplications = res.pagination.totalDocuments;
      this.cdr.detectChanges();
    });

    this.applicationApi.getApplications(this.page, this.limit, '', 'pending').subscribe((res) => {
      this.pending = res.pagination.totalDocuments;
    });

    this.applicationApi.getApplications(this.page, this.limit, '', 'accepted').subscribe((res) => {
      this.accepted = res.pagination.totalDocuments;
    });

    this.applicationApi.getApplications(this.page, this.limit, '', 'rejected').subscribe((res) => {
      this.rejected = res.pagination.totalDocuments;
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

  resumeApplication(application: Application.Detail) {
    if (application.serviceType === EServiceType.birth) {
      this.router.navigate(['/birth-service'], {
        queryParams: {
          applicationId: application._id,
        },
      });
    }

    if (application.serviceType === EServiceType.marriage) {
      this.router.navigate(['/marriage-service'], {
        queryParams: {
          applicationId: application._id,
        },
      });
    }

    if (application.serviceType === EServiceType.death) {
      this.router.navigate(['/death-service'], {
        queryParams: {
          applicationId: application._id,
        },
      });
    }
  }
  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getApplications();
  }
}
