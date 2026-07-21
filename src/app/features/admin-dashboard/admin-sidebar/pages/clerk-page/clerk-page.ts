import { Component, inject, ViewChild } from '@angular/core';
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
import { RouterLink } from '@angular/router';
import { Auth } from '../../../../../@api/auth/auth.type';
import { AuthApi } from '../../../../../@api/auth/auth.api';
import { TitleCasePipe } from '@angular/common';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-clerk-page',
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
    RouterLink,
    TitleCasePipe,
  ],
  templateUrl: './clerk-page.html',
  styleUrl: './clerk-page.css',
})
export class ClerkPage {
  private clerkApi = inject(AuthApi);
  displayedColumns = ['employeeId', 'name', 'email', 'contact', 'status', 'action'];
  dataSource = new MatTableDataSource<Auth.Apis.ClerkList>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  page = 1;
  limit = 5;
  total = 0;
  search = '';

  status: Status[] = [
    { value: 'active', viewValue: 'Active' },
    { value: 'inactive', viewValue: 'Inactive' },
  ];
  constructor() {
    this.getClerks();
  }

  getClerks() {
    this.clerkApi.clerkList(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        console.log(response);

        this.dataSource.data = response.data;
        this.total = response.pagination.total;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getClerks();
  }

  applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1;

    this.getClerks();
  }

  deleteClerk(id: Auth.Id) {
    if (id && confirm('Are you Sure you want to delete this?')) {
      this.clerkApi.deleteClerk(id).subscribe({
        next: () => {
          this.getClerks();
        },
      });
    }
  }
}
