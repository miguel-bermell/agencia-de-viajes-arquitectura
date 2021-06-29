import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private $loading = new BehaviorSubject(false);

  private requestMap: Set<string> = new Set<string>();

  constructor() {}

  showLoading(url: string): void {
    if (url) {
      this.requestMap.add(url);
      this.$loading.next(true);
    }
  }

  hideLoading(url: string): void {
    if (url) {
      this.requestMap.delete(url);

      if (this.requestMap.size === 0) {
        this.$loading.next(false);
      }
    }
  }

  get loading(): Observable<boolean> {
    return this.$loading.asObservable();
  }
}
