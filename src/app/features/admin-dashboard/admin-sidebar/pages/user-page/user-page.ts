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
import { Auth } from '../../../../../@api/auth/auth.type';
import { AuthApi } from '../../../../../@api/auth/auth.api';

@Component({
  selector: 'app-user-page',
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
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage {
  private userService = inject(AuthApi);

  users: Auth.Apis.UserList[] = [];

  page = 1;
  limit = 10;
  total = 0;
  search = '';

  displayedColumns: string[] = [
    'serialNo',
    'userName',
    'userEmail',
    'userContact',
    'userAadhar',

    'action',
  ];
  dataSource = new MatTableDataSource<Auth.Apis.UserList>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
    this.getUsers();
  }

  getUsers() {
    this.userService.userList(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        this.users = response.data;
        this.dataSource.data = response.data;
        this.total = response.pagination.total;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1;

    this.getUsers();
  }

  changePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.getUsers();
  }

  deleteUser(id: Auth.Id) {
    if (id && confirm('Are you Sure you want to delete this?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.getUsers();
        },
      });
    }
  }
}
