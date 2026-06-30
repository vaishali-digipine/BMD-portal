import { Component, ViewChild } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

interface applicationTypes {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  serialNo: number;
  applicationNo: number;
  applicationType: string;
  date: string;
  status: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    serialNo: 1,
    applicationNo: 1234,
    applicationType: 'Birth',
    date: '22/06/2026',
    status: 'pending...',
    action: '',
  },

  {
    serialNo: 2,
    applicationNo: 2345,
    applicationType: 'Marriage',
    date: '22/06/2026',
    status: 'pending...',
    action: '',
  },
  {
    serialNo: 3,
    applicationNo: 6789,
    applicationType: 'death',
    date: '22/06/2026',
    status: 'pending...',
    action: '',
  },
];

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
  ],
  templateUrl: './clerk-application.html',

  styleUrl: './clerk-application.css',
})
export class ClerkApplication {
  displayedColumns: string[] = [
    'serialNo',
    'applicationNo',
    'applicationType',
    'date',
    'status',
    'action',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  types: applicationTypes[] = [
    { value: 'birth', viewValue: 'Birth' },
    { value: 'marriage', viewValue: 'Marriage' },
    { value: 'death', viewValue: 'Death' },
  ];
}
