import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Viaje } from '../models/viaje';
import { IdValor } from '../../models/id-valor';
import { map } from 'rxjs/operators';
import { ViajesFilter } from '../models/viajes-filter';
import { GridEvent } from '../models/grid-event';
import { ViajesGridResult } from '../models/viajes-grid-result';

export interface ViajeDelete {
  deleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ViajesModelService {
  // private tiposDeViaje: IdValor[] = [
  //   { id: 1, valor: 'Para la familia' },
  //   { id: 2, valor: 'Trabajo' },
  //   { id: 3, valor: 'Luna De Miel' },
  //   { id: 4, valor: 'Ahora Mismo Por Favor' },
  //   { id: 5, valor: 'Aventura' },
  //   { id: 6, valor: 'Cultural' },
  //   { id: 7, valor: 'Luxury' },
  //   { id: 8, valor: 'Gastronomico' },
  // ];
  private url = 'http://localhost:3000';
  id = 1;

  constructor(private http: HttpClient) {}

  getViajes(): Observable<ViajesGridResult> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
    });

    let params = new HttpParams();
    params = params.set('page', 1);
    params = params.set('pageSize', 5);

    return this.http
      .get<ViajesGridResult>(`${this.url}/viajes`, { headers, params })
      .pipe(map((x) => new ViajesGridResult(x)));

    // return [...this.viajes];
  }

  // getViajeById(id: string): Viaje | undefined {
  //   return this.viajes.find((x) => x.id === id);
  // }

  getViajeById(id: string): Observable<Viaje | undefined> {
    return this.http
      .get<Viaje>(`${this.url}/viajes/${id}`)
      .pipe(map((x) => new Viaje(x)));
  }

  guardar(viaje: Viaje): Observable<Viaje | null> {
    if (!viaje) {
      return of(null);
    }
    if (viaje.id) {
      // const idx = this.viajes.findIndex((x) => x.id === viaje.id);
      // if (idx >= 0) {
      //   this.viajes[idx] = { ...viaje };
      //   return this.viajes[idx];
      return this.http
        .put<Viaje>(`${this.url}/viajes/${viaje.id}`, viaje)
        .pipe(map((x) => new Viaje(x)));
    }

    return this.http
      .post<Viaje>(`${this.url}/viajes/`, viaje)
      .pipe(map((x) => new Viaje(x)));
  }

  eliminar(viajeId: string): Observable<any> {
    if (viajeId) {
      return this.http
        .delete<ViajeDelete>(`${this.url}/viajes/${viajeId}`)
        .pipe(map((x) => x.deleted));
    }

    // if (viajeId) {
    //   return this.http
    //     .delete<any>(`${this.url}/viajes/${viajeId}`, { observe: 'response' })
    //     .pipe(map((x) => x.status === HttpStatusCode.Ok));
    // }
    return of(null);
  }

  buscar(
    filtro: ViajesFilter | null,
    ev: GridEvent = { page: 1, pageSize: 5 }
  ): Observable<ViajesGridResult> {
    //#region samples

    // let params = '';

    // if (filtro?.tipoDeViajeId) {
    //   params = `tipoDeViajeId=${tipoDeViajeId}`;
    // }

    // if (filtro?.nombre) {
    //   params = params ? `${params}&nombre=${nombre}` : `nombre=${nombre}`;
    // }

    // if (filtro?.destino) {
    //   params = params ? `${params}&destino=${destino}` : `destino=${destino}`;
    // }

    // return this.http.get<Viaje[]>(`${this.url}/viajes/search?${params}`).pipe(
    //   map(x => x.map(v => new Viaje(v)))
    // );

    //#endregion

    let httpP = new HttpParams();

    if (filtro) {
      const { nombre, destino, tipoDeViajeId } = filtro;

      if (filtro?.tipoDeViajeId) {
        httpP = httpP.set('tipoDeViajeId', tipoDeViajeId);
      }

      if (filtro?.nombre) {
        httpP = httpP.set('nombre', nombre);
      }

      if (filtro?.destino) {
        httpP = httpP.set('destino', destino);
      }
    }

    if (ev.page && ev.pageSize) {
      httpP = httpP.set('page', ev.page);
      httpP = httpP.set('pageSize', ev.pageSize);
    }

    return this.http
      .get<ViajesGridResult>(`${this.url}/viajes/search`, { params: httpP })
      .pipe(map((x) => new ViajesGridResult(x)));
  }

  // getTiposDeViajes(): IdValor[] {
  //   return this.tiposDeViaje;
  // }
}
