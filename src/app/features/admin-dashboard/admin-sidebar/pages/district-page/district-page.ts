import { Component, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddDistrict } from '../../add-pages/add-district/add-district';
import { MatDialog } from '@angular/material/dialog';
import { DistrictsApi } from '../../../../../@api/districts/districts.api';
import { District } from '../../../../../@api/districts/districts.type';
import { TitleCasePipe } from '@angular/common';

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
    TitleCasePipe,
  ],
  templateUrl: './district-page.html',
  styleUrl: './district-page.css',
})
export class DistrictPage {
  private districtService = inject(DistrictsApi);

  districts = signal<District.Base[]>([]);

  page = 1;
  limit = 10;
  search = '';
  total = 0;

  displayedColumns: string[] = ['id', 'name', 'stateId', 'action'];
  dataSource = new MatTableDataSource<District.Base>([]);

  dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(AddDistrict);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDistrict();
      }
    });
  }

  constructor() {
    this.getDistrict();
  }

  getDistrict() {
    this.districtService.list(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        this.districts.set(response.data);

        this.dataSource.data = response.data;
        this.total = response.pagination.total;
      },

      error: (err: any) => {
        console.log(err);
      },
    });
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getDistrict();
  }

  searchDistrict(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.getDistrict();
  }

  deleteDistrict(id: District.Id) {
    if (id && confirm('Are you Sure you want to delete this?')) {
      this.districtService.delete(id).subscribe({
        next: () => {
          this.getDistrict();
        },
      });
    }
  }
}
