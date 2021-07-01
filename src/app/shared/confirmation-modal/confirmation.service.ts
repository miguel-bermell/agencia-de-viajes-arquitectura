import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmationData,
  ConfirmationModalComponent,
} from './confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  constructor(private dialog: MatDialog) {}

  confirmar(data: ConfirmationData) {
    this.dialog
      .open(ConfirmationModalComponent, {
        data,
        width: '500px',
        disableClose: true,
      })
      .afterClosed();
  }
}
