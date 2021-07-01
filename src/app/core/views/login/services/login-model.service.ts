import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';

/**
 * Este servicio se comunica con la API para loguear un usuario
 */
@Injectable({
  providedIn: 'root',
})
export class LoginModelService {
  private URL = 'http://localhost:3000/users/login';

  constructor(private http: HttpClient) {}

  login(values: { email: string; password: string }): Observable<any> {
    return this.http
      .post<Usuario>(this.URL, values, { observe: 'response' })
      .pipe(
        map((u) => {
          return new Usuario(u.body);
        }),
        catchError((e: HttpErrorResponse) => {
          if (e.status === HttpStatusCode.InternalServerError) {
            console.log('La api ha muerto');
          }
          console.log(e.message);
          return of(null);
        })
      );
  }

  refresh(refresh: any): Observable<any> {
    return this.http
      .post<Usuario>(this.URL, { refresh }, { observe: 'response' })
      .pipe(
        map((u) => {
          return new Usuario(u.body);
        }),
        catchError((e: HttpErrorResponse) => {
          if (e.status === HttpStatusCode.InternalServerError) {
            console.log('La api ha muerto');
          }
          console.log(e.message);
          return of(null);
        })
      );
  }
}
