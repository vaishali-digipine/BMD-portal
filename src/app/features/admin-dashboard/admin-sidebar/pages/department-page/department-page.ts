import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddDepartment } from '../../add-pages/add-department/add-department';
import { DepartmentsApi } from '../../../../../@api/departments/departments.api';
import { Department } from '../../../../../@api/departments/departments.type';
import { TitleCasePipe } from '@angular/common';

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
    TitleCasePipe,
  ],
  templateUrl: './department-page.html',
  styleUrl: './department-page.css',
})
export class DepartmentPage {
  private departmentService = inject(DepartmentsApi);
  departments = signal<Department.Detail[]>([]);

  page = 1;
  limit = 10;
  search = '';
  total = 0;

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<Department.Detail>([]);

  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddDepartment, {});
  }

  constructor() {
    this.getDepartment();
  }

  getDepartment() {
    this.departmentService.list(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        this.departments.set(response.data);

        this.dataSource.data = response.data;
        this.total = response.pagination.totalDocuments;
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getDepartment();
  }

  searchDepartment(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1;

    this.getDepartment();
  }

  deleteDepartment(id: Department.Id) {
    if (id && confirm('Are you sure you want to delete this department?')) {
      this.departmentService.delete(id).subscribe({
        next: () => {
          this.getDepartment();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
