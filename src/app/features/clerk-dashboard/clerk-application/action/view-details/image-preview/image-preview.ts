import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './image-preview.html',
  styleUrl: './image-preview.css',
})
export class ImagePreview {
  constructor(
    public dialogRef: MatDialogRef<ImagePreview>,
    @Inject(MAT_DIALOG_DATA)
    public data: { image: string; title: string },
  ) {}

  close() {
    this.dialogRef.close();
  }
}
