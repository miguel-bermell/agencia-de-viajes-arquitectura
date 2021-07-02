import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Cliente } from '../models/cliente';
import { ClienteList } from '../models/cliente-list-item';
import { EstadoCivilModel } from '../models/estadoCivil';
import { IdValor } from './id-valor';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  url = 'http://localhost:3000';

  // private estadoCivil: IdValor[] = [
  //   { id: 1, valor: 'soltero' },
  //   { id: 2, valor: 'casado' },
  //   { id: 3, valor: 'viudo' },
  //   { id: 4, valor: 'divorciado' },
  //   { id: 99, valor: 'desconocido' },
  // ];

  constructor(private http: HttpClient, private authService: AuthService) {}
  private headers = new HttpHeaders({
    Authorization: `bearer ${this.authService.bearer}`,
  });
  // private headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   Authorization: `bearer ${this.authService.bearer}`,
  //   'No-Auth': 'True',
  // });

  getAll(): Observable<ClienteList[]> {
    return this.http
      .get<ClienteList[]>(`${this.url}/clientes`, {
        headers: this.headers,
      })
      .pipe(map((clientes) => clientes.map((x) => new ClienteList(x))));
  }

  getById(id: string): Observable<Cliente | null> {
    if (!id) {
      return of(null);
    }

    return this.http
      .get<Cliente>(`${this.url}/clientes/${id}`, {
        headers: this.headers,
      })
      .pipe(map((cliente) => new Cliente(cliente)));
  }

  save(cliente: Cliente): Observable<Cliente | null> {
    if (!cliente) {
      return of(null);
    }

    return cliente?.id
      ? this.http
          .put<Cliente>(`${this.url}/clientes/${cliente.id}`, cliente, {
            headers: this.headers,
          })
          .pipe(map((cliente) => new Cliente(cliente)))
      : this.http
          .post<Cliente>(`${this.url}/clientes/`, cliente, {
            headers: this.headers,
          })
          .pipe(map((cliente) => new Cliente(cliente)));
  }

  delete(clienteId: string): Observable<boolean> {
    return clienteId
      ? this.http
          .delete<HttpResponse<any>>(`${this.url}/clientes/${clienteId}`, {
            observe: 'response',
            headers: this.headers,
          })
          .pipe(map((res) => res.status === HttpStatusCode.NoContent))
      : of(false); // el of hace que devuelvas un observable
  }

  // getEstadoCivil(): IdValor[] {
  //   return this.estadoCivil;
  // }

  getEstadoCivil(): Observable<EstadoCivilModel[]> {
    return this.http
      .get<EstadoCivilModel[]>(`${this.url}/estadosciviles`, {
        headers: this.headers,
      })
      .pipe(map((estado) => estado.map((x) => new EstadoCivilModel(x))));
  }
}
