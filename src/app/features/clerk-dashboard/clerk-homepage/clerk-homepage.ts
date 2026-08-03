import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuthApi } from '../../../@api/auth/auth.api';
import { ApplicationApi } from '../../../@api/applications/application.api';
import { Application, EApplicationStatus } from '../../../@api/applications/applications.type';

@Component({
  selector: 'app-clerk-homepage',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    NgApexchartsModule,
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
  ],
  templateUrl: './clerk-homepage.html',
  styleUrl: './clerk-homepage.css',
})
export class ClerkHomepage {
  private authApi = inject(AuthApi);
  private router = inject(Router);
  private applicationApi = inject(ApplicationApi);
  private cdr = inject(ChangeDetectorRef);

  lineChartOptions: any;
  donutChartOptions: any;

  totalApplications = 0;
  page = 1;
  limit = 10;
  pending = 0;
  rejected = 0;
  accepted = 0;
  birthPending = 0;
  marriagePending = 0;
  deathPending = 0;
  applications: Application.Detail[] = [];
  pendingApplications: Application.Detail[] = [];

  loadDashboard() {
    this.applicationApi.list(this.page, this.limit, '').subscribe((res) => {
      this.totalApplications = res.pagination.totalDocuments;
      this.applications = res.data;
      this.cdr.detectChanges();
      this.loadLineChart();
    });

    this.applicationApi.getApplications(this.page, this.limit, '', 'pending').subscribe((res) => {
      this.pending = res.pagination.totalDocuments;
      this.cdr.detectChanges();
      this.loadDonutChart();
    });

    this.applicationApi.getApplications(this.page, this.limit, '', 'accepted').subscribe((res) => {
      this.accepted = res.pagination.totalDocuments;
      this.cdr.detectChanges();
      this.loadDonutChart();
    });

    this.applicationApi.getApplications(this.page, this.limit, '', 'rejected').subscribe((res) => {
      this.rejected = res.pagination.totalDocuments;
      this.cdr.detectChanges();
      this.loadDonutChart();
    });

    this.applicationApi
      .getApplications(this.page, this.limit, '', EApplicationStatus.pending)
      .subscribe({
        next: (res) => {
          this.pendingApplications = res.data;

          this.birthPending = res.data.filter((x) => x.serviceType === 'birth').length;

          this.marriagePending = res.data.filter((x) => x.serviceType === 'marriage').length;

          this.deathPending = res.data.filter((x) => x.serviceType === 'death').length;
        },
      });
  }

  loadLineChart() {
    const birth = this.applications.filter((x) => x.serviceType === 'birth').length;

    const marriage = this.applications.filter((x) => x.serviceType === 'marriage').length;

    const death = this.applications.filter((x) => x.serviceType === 'death').length;

    this.lineChartOptions = {
      series: [
        {
          name: 'Applications',
          data: [birth, marriage, death],
        },
      ],

      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false,
        },
      },

      stroke: {
        curve: 'smooth',
      },

      dataLabels: {
        enabled: true,
      },

      colors: ['#2563eb'],

      xaxis: {
        categories: ['Birth', 'Marriage', 'Death'],
      },
    };
  }

  loadDonutChart() {
    this.donutChartOptions = {
      series: [this.accepted, this.rejected, this.pending],

      chart: {
        type: 'donut',
        height: 320,
      },

      labels: ['Accepted', 'Rejected', 'Pending'],

      colors: ['#22c55e', '#ef4444', '#f59e0b'],

      legend: {
        position: 'bottom',
      },
    };
  }

  constructor() {
    this.loadDashboard();
    this.loadLineChart();
    this.loadDonutChart();
    //   this.lineChartOptions = {
    //     chart: {
    //       height: 350,
    //       type: 'line',

    //       zoom: {
    //         enabled: false,
    //       },
    //       toolbar: {
    //         show: false,
    //       },
    //     },
    //     colors: ['#ADD8E6'],
    //     dataLabels: {
    //       enabled: true,
    //     },
    //     stroke: {
    //       curve: 'smooth',
    //     },
    //     title: {
    //       text: 'Application Overview',
    //       align: 'left',
    //     },
    //     markers: {
    //       size: 1,
    //     },
    //     xaxis: {
    //       categories: [
    //         'Jan',
    //         'Feb',
    //         'Mar',
    //         'Apr',
    //         'May',
    //         'Jun',
    //         'Jul',
    //         'Aug',
    //         'Sep',
    //         'Oct',
    //         'Nov',
    //         'Dec',
    //       ],
    //     },
    //     yaxis: {
    //       min: 0,
    //       max: 100,
    //     },
    //     legend: {
    //       position: 'top',
    //       horizontalAlign: 'right',
    //       floating: true,
    //       offsetY: -25,
    //       offsetX: -5,
    //     },
    //   };

    //   this.donutChartOptions = {
    //     chart: {
    //       type: 'donut',
    //       height: 320,
    //     },

    //     labels: ['Accepted', 'Rejected', 'Pending'],

    //     colors: ['#22c55e', '#ef4444', '#f97316'],

    //     legend: {
    //       position: 'bottom',
    //     },
    //   };
  }
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
