import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuthApi } from '../../../@api/auth/auth.api';
import { StatesApi } from '../../../@api/states/states.api';
import { DistrictsApi } from '../../../@api/districts/districts.api';
import { OfficesApi } from '../../../@api/offices/offices.api';
import { DepartmentsApi } from '../../../@api/departments/departments.api';

@Component({
  selector: 'app-admin-homepage',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgApexchartsModule,
    MatCard,
    MatCardContent,
    RouterLink,
  ],
  templateUrl: './admin-homepage.html',
  styleUrl: './admin-homepage.css',
})
export class AdminHomepage {
  lineChartOptions: any;
  pieChartOptions: any;

  private usersApi = inject(AuthApi);
  private statesApi = inject(StatesApi);
  private districtsApi = inject(DistrictsApi);
  private officesApi = inject(OfficesApi);
  private departmentsApi = inject(DepartmentsApi);
  private clerksApi = inject(AuthApi);

  totalUsers = 0;
  totalClerks = 0;
  totalStates = 0;
  totalDistricts = 0;
  totalOffices = 0;
  totalDepartments = 0;
  page = 1;
  limit = 10;
  search = '';

  ngOnInit() {
    this.getUsers();
    this.getClerks();
    this.getStates();
    this.getDistricts();
    this.getOffices();
    this.getDepartments();
  }

  getUsers() {
    this.usersApi.userList(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        this.totalUsers = response.pagination.totalRecords;
      },
    });
  }

  getClerks() {
    this.clerksApi.clerkList(this.page, this.limit, this.search).subscribe({
      next: (res) => {
        this.totalClerks = res.pagination.totalRecords;
      },
    });
  }

  getStates() {
    this.statesApi.list(this.page, this.limit, this.search).subscribe({
      next: (res) => {
        this.totalStates = res.pagination.totalStates;
      },
    });
  }

  getDistricts() {
    this.districtsApi.list(this.page, this.limit, this.search).subscribe({
      next: (res) => {
        this.totalDistricts = res.pagination.totalDistricts;
      },
    });
  }

  getOffices() {
    this.officesApi.list(this.page, this.limit, this.search).subscribe({
      next: (res) => {
        this.totalOffices = res.pagination.totalOffices;
      },
    });
  }

  getDepartments() {
    this.departmentsApi.list(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        this.totalDepartments = response.pagination.totalDepartments;
      },
    });
  }

  constructor() {
    this.lineChartOptions = {
      series: [
        {
          name: 'Users',
          data: [12, 23, 45, 67, 30, 45, 56, 78, 43, 23, 39, 40],
        },
        {
          name: 'Clerks',
          data: [4, 6, 10, 6, 79, 4, 7, 23, 20, 15, 35, 27],
        },
        {
          name: 'Offices',
          data: [33, 33, 32, 34, 10, 30, 40, 35, 34, 32, 45, 23],
        },
        {
          name: 'Districts',
          data: [33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33],
        },
        {
          name: 'Departments',
          data: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        },
      ],
      chart: {
        height: 450,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Overview Analytics',
        align: 'left',
      },
      colors: ['#0000FF', '#008000', '#800080', '#FFFF00', '#FFA500'],
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        min: 0,
        max: 80,
      },
    };

    this.pieChartOptions = {
      series: [25, 15, 3],
      chart: {
        width: 350,
        type: 'pie',
      },
      labels: ['Users', 'Clerks', 'Departments'],
      theme: {
        monochrome: {
          enabled: true,
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      grid: {
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      dataLabels: {
        formatter(
          val: number,
          opts: { w: { globals: { labels: { [x: string]: any } } }; seriesIndex: string | number },
        ) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + '%'];
        },
      },
      legend: {
        show: false,
      },
    };
  }
}
