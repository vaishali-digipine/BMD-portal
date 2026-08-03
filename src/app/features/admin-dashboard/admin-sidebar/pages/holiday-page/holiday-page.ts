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
import { AddHoliday } from '../../add-pages/add-holiday/add-holiday';
import { MatDialog } from '@angular/material/dialog';
import { HolidaysApi } from '../../../../../@api/holidays/holidays.api';
import { Holiday } from '../../../../../@api/holidays/holidays.type';
import { DatePipe, TitleCasePipe } from '@angular/common';

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
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './holiday-page.html',
  styleUrl: './holiday-page.css',
})
export class HolidayPage {
  private holidayService = inject(HolidaysApi);
  holidays = signal<Holiday.Detail[]>([]);

  page = 1;
  limit = 5;
  total = 0;

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'holidayDate',
    'year',
    'isNationalHoliday',
    'officeId',
    'action',
  ];
  dataSource = new MatTableDataSource<Holiday.Detail>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AddHoliday, {});
  }

  constructor() {
    this.getHoliday();
  }

  getHoliday() {
    this.holidayService.list(this.page, this.limit).subscribe({
      next: (response) => {
        this.holidays.set(response.data);
        this.dataSource.data = response.data;
        this.total = response.pagination.totalDocuments;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteHoliday(id: Holiday.Id) {
    if (id && confirm('Are you Sure you want to delete this?')) {
      this.holidayService.delete(id).subscribe({
        next: () => {
          this.getHoliday();
        },
      });
    }
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getHoliday();
  }
}
