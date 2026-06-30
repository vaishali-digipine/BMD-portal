import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddDepartment } from '../../add-pages/add-department/add-department';

export interface PeriodicElement {
  departmentId: number;
  departmentName: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    departmentId: 1,
    departmentName: 'Birth',
    action: '',
  },

  {
    departmentId: 2,
    departmentName: 'Marriage',
    action: '',
  },
  {
    departmentId: 3,
    departmentName: 'Death',
    action: '',
  },
];

@Component({
  selector: 'app-department-page',
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
    MatDialogModule,
  ],
  templateUrl: './department-page.html',
  styleUrl: './department-page.css',
})
export class DepartmentPage {
  displayedColumns: string[] = ['departmentId', 'departmentName', 'action'];
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
    this.dialog.open(AddDepartment, {});
  }
}
