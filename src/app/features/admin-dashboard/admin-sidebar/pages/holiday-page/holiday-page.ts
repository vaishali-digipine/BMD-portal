import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddHoliday } from '../../add-pages/add-holiday/add-holiday';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  serialNo: number;
  holidayName: string;
  description: string;

  date: string;
  year: string;
  nationalHoliday: string;
  office: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    serialNo: 1,
    holidayName: 'Diwali',
    description: 'Festival of Lights celebrated across India.',
    date: '20/10/2022',
    year: '2022',
    nationalHoliday: 'yes',
    office: 'rajkot',
    action: '',
  },

  {
    serialNo: 2,
    holidayName: 'Diwali',
    description: 'Festival of Lights celebrated across India.',
    date: '20/10/2022',
    year: '2022',
    nationalHoliday: 'yes',
    office: 'rajkot',
    action: '',
  },
  {
    serialNo: 3,
    holidayName: 'Diwali',
    description: 'Festival of Lights celebrated across India.',
    date: '20/10/2022',
    year: '2022',
    nationalHoliday: 'yes',
    office: 'rajkot',
    action: '',
  },
];

@Component({
  selector: 'app-holiday-page',
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
  ],
  templateUrl: './holiday-page.html',
  styleUrl: './holiday-page.css',
})
export class HolidayPage {
  displayedColumns: string[] = [
    'serialNo',
    'holidayName',
    'description',
    'date',
    'year',
    'nationalHoliday',
    'office',
    'action',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddHoliday, {});
  }
}
