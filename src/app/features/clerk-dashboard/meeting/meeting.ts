import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MeetingApi } from '../../../@api/meeting/meeting.api';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { DatePipe } from '@angular/common';
import { Meetings } from '../../../@api/meeting/meeting.type';
import {
  Application,
  EApplicationStatus,
  EServiceType,
} from '../../../@api/applications/applications.type';
import { ApplicationApi } from '../../../@api/applications/application.api';
import { RemarkDialogbox } from '../clerk-application/remark-dialogbox/remark-dialogbox';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting',
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
    DatePipe,
  ],
  templateUrl: './meeting.html',
  styleUrl: './meeting.css',
})
export class Meeting {
  private todayMeetingApi = inject(MeetingApi);
  private applicationApi = inject(ApplicationApi);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  displayedColumns = ['serialNo', 'roomId', 'meetingDate', 'meetingTime', 'status', 'action'];
  dataSource = new MatTableDataSource<Meetings.Base>([]);

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
    this.getTodayMeetings();
  }

  getTodayMeetings() {
    this.todayMeetingApi.getTodayMeeting(this.page, this.limit, this.search).subscribe({
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

  acceptApplication(application: Application.Detail) {
    if (application.status !== EApplicationStatus.pending) {
      return;
    }

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
    if (application.status !== EApplicationStatus.pending) {
      return;
    }

    const dialogRef = this.dialog.open(RemarkDialogbox, {
      width: '450px',
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
            application.status = EApplicationStatus.rejected;
            application.remarks = remarks;
          },
          error: console.error,
        });
    });
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getTodayMeetings();
  }

  searchState(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.getTodayMeetings();
  }
}
