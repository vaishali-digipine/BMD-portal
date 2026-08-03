import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { ApplicationApi } from '../../../@api/applications/application.api';
import {
  Application,
  EApplicationStatus,
  EServiceType,
} from '../../../@api/applications/applications.type';
import { MatDialog } from '@angular/material/dialog';
import { RemarkDialogbox } from './remark-dialogbox/remark-dialogbox';

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
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  displayedColumns = ['serialNo', 'applicationNumber', 'serviceType', 'date', 'status', 'action'];
  dataSource = new MatTableDataSource<Application.Detail>([]);

  page = 1;
  limit = 5;
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

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getApplications();
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

  editApplication(application: Application.Detail) {
    if (application.serviceType === EServiceType.birth) {
      this.router.navigate(['/edit-birth', application.serviceId._id]);
    } else if (application.serviceType === EServiceType.marriage) {
      this.router.navigate(['/edit-marriage', application.serviceId._id]);
    } else if (application.serviceType === EServiceType.death) {
      this.router.navigate(['/edit-death', application.serviceId._id]);
    }
  }

  // editApplication(application: Application.Detail) {
  //   if (application.serviceType === EServiceType.birth) {
  //     this.router.navigate(['/edit-birth', application._id]);
  //   } else if (application.serviceType === EServiceType.marriage) {
  //     this.router.navigate(['/edit-marriage', application._id]);
  //   } else if (application.serviceType === EServiceType.death) {
  //     this.router.navigate(['/edit-death', application._id]);
  //   }
  // }

  loadCards() {
    this.applicationApi.list(this.page, this.limit, '').subscribe((res) => {
      this.totalApplications = res.pagination.totalDocuments;
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

  acceptApplication(application: Application.Detail) {
    this.applicationApi
      .update(application._id, {
        status: EApplicationStatus.accepted,
      })
      .subscribe({
        next: () => {
          this.getApplications();
          application.status = EApplicationStatus.accepted;

          this.cdr.detectChanges();
        },
        error: console.error,
      });
  }

  rejectApplication(application: Application.Detail) {
    const dialogRef = this.dialog.open(RemarkDialogbox, {
      width: '600px',
      maxWidth: '95vw',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((remarks) => {
      if (!remarks) return;

      this.applicationApi
        .update(application._id, {
          status: EApplicationStatus.rejected,
          remarks,
        })
        .subscribe({
          next: () => {
            this.getApplications();
            application.status = EApplicationStatus.rejected;
            application.remarks = remarks;
            this.loadCards();
          },

          error: console.error,
        });
    });
  }
}
