import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastMessagesService } from './toast-messages.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastMessagesService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        console.log(error);
        if (
          error instanceof HttpErrorResponse &&
          error.status === HttpStatusCode.InternalServerError
        ) {
          console.log('entro en el if' + error.status);
          this.authService.logOutUser();
          this.router.navigate(['login']);
          this.toast.showError('Su sesión ha caducado');
        }
        return error;
      })
    ) as Observable<HttpEvent<any>>;
  }
}
