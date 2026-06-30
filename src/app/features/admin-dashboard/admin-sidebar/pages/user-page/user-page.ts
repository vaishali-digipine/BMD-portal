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

export interface PeriodicElement {
  serialNo: number;
  userName: string;
  userEmail: string;
  userContact: number;
  userAadhar: string;
  registerOn: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    serialNo: 1,
    userName: 'abc',
    userEmail: 'abc123@gmail.com',
    userContact: 2569834895,
    userAadhar: 'xxxx xxxx 1234',
    registerOn: '17/08/2010',
    action: '',
  },

  {
    serialNo: 1,
    userName: 'abc',
    userEmail: 'abc123@gmail.com',
    userContact: 2569834895,
    userAadhar: 'xxxx xxxx 5896',
    registerOn: '17/08/2010',
    action: '',
  },
  {
    serialNo: 1,
    userName: 'abc',
    userEmail: 'abc123@gmail.com',
    userContact: 2569834895,
    userAadhar: 'xxxx xxxx 7825',
    registerOn: '17/08/2010',
    action: '',
  },
];

@Component({
  selector: 'app-user-page',
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
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage {
  displayedColumns: string[] = [
    'serialNo',
    'userName',
    'userEmail',
    'userContact',
    'userAadhar',
    'registerOn',
    'action',
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
