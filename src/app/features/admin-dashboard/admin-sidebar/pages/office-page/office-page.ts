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
import { AddOffice } from '../../add-pages/add-office/add-office';
import { MatDialog } from '@angular/material/dialog';
import { OfficesApi } from '../../../../../@api/offices/offices.api';
import { Office } from '../../../../../@api/offices/offices.type';
import { TitleCasePipe } from '@angular/common';

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
    TitleCasePipe,
  ],
  templateUrl: './office-page.html',
  styleUrl: './office-page.css',
})
export class OfficePage {
  private officeService = inject(OfficesApi);
  offices = signal<Office.Detail[]>([]);

  page = 1;
  limit = 10;
  search = '';
  total = 0;

  displayedColumns: string[] = ['id', 'name', 'districtId', 'action'];
  dataSource = new MatTableDataSource<Office.Detail>([]);

  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddOffice, {});
  }

  constructor() {
    this.getOffice();
  }

  getOffice() {
    this.officeService.list(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        this.offices.set(response.data);

        this.dataSource.data = response.data;

        this.total = response.pagination.total;
      },

      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteOffice(id: Office.Id) {
    if (id && confirm('Are you sure you want to delete this office?')) {
      this.officeService.delete(id).subscribe({
        next: () => {
          this.getOffice();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getOffice();
  }

  searchOffice(event: Event) {
    this.search = (event.target as HTMLInputElement).value;

    this.page = 1;

    this.getOffice();
  }
}
