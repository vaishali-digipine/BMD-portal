import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

export interface PeriodicElement {
  serialNo: number;
  applicationNo: number;
  applicationType: string;
  date: string;

  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    serialNo: 1,
    applicationNo: 1234,
    applicationType: 'Birth',
    date: '22/06/2026',

    status: 'pending...',
  },
];

@Component({
  selector: 'app-user-application',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
  ],
  templateUrl: './user-application.html',
  styleUrl: './user-application.css',
})
export class UserApplication {
  displayedColumns: string[] = ['serialNo', 'applicationNo', 'applicationType', 'date', 'status'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
}
