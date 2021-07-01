import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  AlertModalComponent,
  ConfirmationDataAlert,
} from './alert-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationAlertService {
  constructor(private dialog: MatDialog) {}

  confirmar(data: ConfirmationDataAlert): Observable<any> {
    return this.dialog
      .open(AlertModalComponent, {
        data,
        width: '500px',
        disableClose: true,
      })
      .afterClosed();
  }
}
