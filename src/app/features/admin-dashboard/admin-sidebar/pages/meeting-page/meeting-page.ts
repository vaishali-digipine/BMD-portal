import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MeetingApi } from '../../../../../@api/meeting/meeting.api';
import { Meetings } from '../../../../../@api/meeting/meeting.type';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ApplicationApi } from '../../../../../@api/applications/application.api';
import { Router } from '@angular/router';
import { Application, EServiceType } from '../../../../../@api/applications/applications.type';

@Component({
  selector: 'app-meeting-page',
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

    DatePipe,
  ],
  templateUrl: './meeting-page.html',
  styleUrl: './meeting-page.css',
})
export class MeetingPage {
  private todayMeetingApi = inject(MeetingApi);
  private applicationApi = inject(ApplicationApi);
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

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getTodayMeetings();
  }

  searchMeetings(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.getTodayMeetings();
  }
}
