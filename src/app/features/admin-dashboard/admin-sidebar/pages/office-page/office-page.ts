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
import { AddOffice } from '../../add-pages/add-office/add-office';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  officeId: number;
  officeName: string;
  districtName: string;
  stateName: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    officeId: 1,
    officeName: 'abc',
    districtName: 'def',
    stateName: 'Gujarat',
    action: '',
  },

  {
    officeId: 2,
    officeName: 'xyz',
    districtName: 'def',
    stateName: 'Gujarat',
    action: '',
  },
  {
    officeId: 3,
    officeName: 'def',
    districtName: 'abc',
    stateName: 'Gujarat',
    action: '',
  },
];

@Component({
  selector: 'app-office-page',
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
  templateUrl: './office-page.html',
  styleUrl: './office-page.css',
})
export class OfficePage {
  displayedColumns: string[] = ['officeId', 'officeName', 'districtName', 'stateName', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddOffice, {});
  }
}
