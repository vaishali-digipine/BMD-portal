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
import { AddDistrict } from '../../add-pages/add-district/add-district';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  districtId: number;
  districtName: string;
  stateName: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    districtId: 1,
    districtName: 'abc',
    stateName: 'gujarat',
    action: '',
  },

  {
    districtId: 1,
    districtName: 'abc',
    stateName: 'gujarat',
    action: '',
  },
  {
    districtId: 1,
    districtName: 'abc',
    stateName: 'gujarat',
    action: '',
  },
];

@Component({
  selector: 'app-district-page',
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
  templateUrl: './district-page.html',
  styleUrl: './district-page.css',
})
export class DistrictPage {
  displayedColumns: string[] = ['districtId', 'districtName', 'stateName', 'action'];
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
    this.dialog.open(AddDistrict, {});
  }
}
