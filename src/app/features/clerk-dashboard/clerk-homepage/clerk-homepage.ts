import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

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
  lineChartOptions: any;
  donutChartOptions: any;

  constructor() {
    this.lineChartOptions = {
      series: [
        {
          name: 'Total Applications',
          data: [18, 22, 28, 30, 25, 20, 45, 10, 60, 67, 56, 20],
        },
      ],

      chart: {
        height: 350,
        type: 'line',

        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#ADD8E6'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Application Overview',
        align: 'left',
      },
      markers: {
        size: 1,
      },
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
        max: 100,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    };

    this.donutChartOptions = {
      series: [3, 1, 2],

      chart: {
        type: 'donut',
        height: 320,
      },

      labels: ['Accepted', 'Rejected', 'Pending'],

      colors: ['#22c55e', '#ef4444', '#f97316'],

      legend: {
        position: 'bottom',
      },
    };
  }
}
