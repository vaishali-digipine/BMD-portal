import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApplicationApi } from '../../../../../../@api/applications/application.api';
import { Application } from '../../../../../../@api/applications/applications.type';
import { MarriageService } from '../../../../../../@api/marriageService/marriageService.type';

@Component({
  selector: 'app-marriage-viewdetail',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    MatCardContent,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    DatePipe,
  ],
  templateUrl: './marriage-viewdetail.html',
  styleUrl: './marriage-viewdetail.css',
})
export class MarriageViewdetail {
  private route = inject(ActivatedRoute);
  private applicationApi = inject(ApplicationApi);
  private cdr = inject(ChangeDetectorRef);

  application!: Application.Detail;
  marriage!: MarriageService.Detail;

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

        this.marriage = response.data.serviceId as MarriageService.Detail;

        this.cdr.detectChanges();
      },
    });
  }
}
