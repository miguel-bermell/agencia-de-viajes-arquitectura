import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastMessagesService {
  constructor(private toast: HotToastService) {}

  showSuccess(text: string): void {
    this.toast.success(text, {
      position: 'bottom-center',
      autoClose: true,
    });
  }

  showError(text: string): void {
    this.toast.error(text, {
      position: 'bottom-center',
      duration: 3000,
      dismissible: true,
    });
  }
}
