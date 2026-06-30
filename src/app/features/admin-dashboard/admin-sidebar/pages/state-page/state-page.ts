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
import { MatDialog } from '@angular/material/dialog';
import { AddState } from '../../add-pages/add-state/add-state';

export interface PeriodicElement {
  stateId: number;
  stateName: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    stateId: 1,
    stateName: 'abc',
    action: '',
  },

  {
    stateId: 1,
    stateName: 'abc',
    action: '',
  },
  {
    stateId: 1,
    stateName: 'abc',
    action: '',
  },
];

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
  ],
  templateUrl: './state-page.html',
  styleUrl: './state-page.css',
})
export class StatePage {
  displayedColumns: string[] = ['stateId', 'stateName', 'action'];
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
    this.dialog.open(AddState, {});
  }
}
