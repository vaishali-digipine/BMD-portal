import { Component, ViewChild } from '@angular/core';
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
import { RouterLink } from '@angular/router';

interface Status {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  empId: number;
  empName: string;
  empEmail: string;
  empContact: number;
  status: '';
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    empId: 1,
    empName: 'abc',
    empEmail: 'abc123@gmail.com',
    empContact: 2569834895,
    status: '',
    action: '',
  },

  {
    empId: 2,
    empName: 'xyz',
    empEmail: 'xyz123@gmail.com',
    empContact: 2569834895,
    status: '',
    action: '',
  },
  {
    empId: 3,
    empName: 'mno',
    empEmail: 'mno123@gmail.com',
    empContact: 2569834895,
    status: '',
    action: '',
  },
];

@Component({
  selector: 'app-clerk-page',
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
    RouterLink,
  ],
  templateUrl: './clerk-page.html',
  styleUrl: './clerk-page.css',
})
export class ClerkPage {
  displayedColumns: string[] = ['empId', 'empName', 'empEmail', 'empContact', 'status', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  status: Status[] = [
    { value: '1', viewValue: 'Active' },
    { value: '2', viewValue: 'UnActive' },
  ];
}
