import { DatePipe, Location, TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { ApplicationApi } from '../../../../../../@api/applications/application.api';
import { Application } from '../../../../../../@api/applications/applications.type';
import { DeathService } from '../../../../../../@api/deathService/deathService.type';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreview } from '../image-preview/image-preview';

@Component({
  selector: 'app-death-viewdetail',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    MatCardContent,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './death-viewdetail.html',
  styleUrl: './death-viewdetail.css',
})
export class DeathViewdetail {
  private route = inject(ActivatedRoute);
  private applicationApi = inject(ApplicationApi);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  private location = inject(Location);

  application!: Application.Detail;
  death!: DeathService.Detail;

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

        this.death = response.data.serviceId as DeathService.Detail;

        this.cdr.detectChanges();
      },
    });
  }

  openImage(image: string, title: string) {
    this.dialog.open(ImagePreview, {
      width: '700px',
      maxWidth: '90vw',
      data: {
        image,
        title,
      },
    });
  }

  goBack() {
    this.location.back();
  }
}
