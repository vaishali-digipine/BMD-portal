import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { SlotApi } from '../../../../../@api/slots/slot.api';
import { Slot } from '../../../../../@api/slots/slots.type';

@Component({
  selector: 'app-slot-page',
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
  ],
  templateUrl: './slot-page.html',
  styleUrl: './slot-page.css',
})
export class SlotPage {
  private router = inject(Router);
  private slotApi = inject(SlotApi);
  displayedColumns: string[] = ['serialNo', 'slotDate', 'slotTime', 'officeName', 'departmentName'];
  dataSource = new MatTableDataSource<Slot.Base>([]);

  page = 1;
  limit = 5;
  total = 0;
  officeDepartmentId = '';
  slotDate = '';

  constructor() {
    this.getSlots();
  }

  getSlots() {
    this.slotApi.getSlots(this.page, this.limit).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.total = response.pagination.totalDocuments;
      },
      error: console.error,
    });
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getSlots();
  }
}
