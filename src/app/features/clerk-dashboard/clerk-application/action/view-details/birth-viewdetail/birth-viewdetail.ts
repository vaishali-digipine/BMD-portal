import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApplicationApi } from '../../../../../../@api/applications/application.api';
import { Application } from '../../../../../../@api/applications/applications.type';
import { BirthService } from '../../../../../../@api/birthService/birthServices.type';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-birth-viewdetail',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCardModule,
    MatIconModule,
    DatePipe,

    MatInputModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './birth-viewdetail.html',
  styleUrl: './birth-viewdetail.css',
})
export class BirthViewdetail {
  private route = inject(ActivatedRoute);
  private applicationApi = inject(ApplicationApi);
  private cdr = inject(ChangeDetectorRef);

  application!: Application.Detail;
  birth!: BirthService.Detail;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getApplication(id);
    }
  }

  getApplication(id: string) {
    this.applicationApi.getById(id).subscribe({
      next: (response) => {
        this.application = response.data;

        this.birth = response.data.serviceId as BirthService.Detail;

        this.cdr.detectChanges();
      },
    });
  }
}
