import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoDeViaje } from '../models/enums/tipo-de-viaje.enum';
import { tipoDeViajeModel } from '../models/tipoDeViaje';
import { Viaje } from '../models/viaje';
import { ViajesFilter } from '../models/viajes-filter';
import { IdValor } from '../../models/id-valor';
import { TipoDeViajeModelService } from '../services/tipoDeViaje-model.service';
import { ViajesModelService } from '../services/viajes-model.service';
import { ViajesGridResult } from '../models/viajes-grid-result';
import { GridEvent } from '../models/grid-event';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { ConfirmationService } from 'src/app/shared/confirmation-modal/confirmation.service';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss'],
})
export class ViajesListComponent implements OnInit {
  viajes: ViajesGridResult = new ViajesGridResult();
  tipoDeViaje: tipoDeViajeModel[] = [];
  mostrarTarjetas = false;

  filtro: ViajesFilter | null = null;

  constructor(
    private viajesModel: ViajesModelService,
    private tiposDeViajeModel: TipoDeViajeModelService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarViajes();
    this.tiposDeViajeModel.getTipoDeViaje().subscribe((res) => {
      this.tipoDeViaje = res;
      console.log(res);
    });
  }

  cambiarVistaClick() {
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }

  searchClick(filtro: ViajesFilter): void {
    if (filtro) {
      this.filtro = filtro;
      this.viajesModel.buscar(filtro).subscribe((result) => {
        this.viajes = result;
      });
    }
  }

  eliminarClick(id: string): void {
    if (id) {
      this.confirmationService
        .confirmar({
          titulo: 'Eliminar Viaje',
          pregunta: '¿Seguro que quieres eliminar el viaje?',
          opcionSi: 'Eliminar',
          opcionNo: 'Cancelar',
        })
        .subscribe((x) => {
          if (x) {
            this.viajesModel.eliminar(id).subscribe((result) => {
              if (result) {
                this.cargarViajes();
              }
            });
          }
        });
    }
  }

  editarClick(id: string): void {
    if (id) {
      this.router.navigate(['viajes/editar', id]);
    }
  }

  private cargarViajes() {
    this.viajesModel.getViajes().subscribe((result) => {
      this.viajes = result;
    });
  }

  paging(ev: GridEvent): void {
    this.viajesModel.buscar(this.filtro, ev).subscribe((result) => {
      if (result) {
        this.viajes = result;
      }
    });
  }
}
