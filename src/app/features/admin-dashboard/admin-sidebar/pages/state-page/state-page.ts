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
import { MatDialog } from '@angular/material/dialog';
import { AddState } from '../../add-pages/add-state/add-state';
import { StatesApi } from '../../../../../@api/states/states.api';
import { State } from '../../../../../@api/states/states.type';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-state-page',
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
  templateUrl: './state-page.html',
  styleUrl: './state-page.css',
})
export class StatePage {
  private stateService = inject(StatesApi);
  states = signal<State.Detail[]>([]);

  page = 1;
  limit = 10;
  search = '';
  total = 0;

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<State.Detail>([]);

  dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(AddState);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getState();
      }
    });
  }

  constructor() {
    this.getState();
  }

  getState() {
    this.stateService.list(this.page, this.limit, this.search).subscribe({
      next: (response) => {
        this.states.set(response.data);

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

    this.getState();
  }

  searchState(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.getState();
  }

  deleteState(id: State.Id) {
    if (id && confirm('Are you Sure you want to delete this?')) {
      this.stateService.delete(id).subscribe({
        next: () => {
          this.getState();
        },
      });
    }
  }
}
