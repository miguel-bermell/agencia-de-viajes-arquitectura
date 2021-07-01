import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GridEvent } from '../../models/grid-event';
import { Viaje } from '../../models/viaje';
import { ViajesGridResult } from '../../models/viajes-grid-result';

@Component({
  selector: 'app-viajes-table-list',
  templateUrl: './viajes-table-list.component.html',
  styleUrls: ['./viajes-table-list.component.scss'],
})
export class ViajesTableListComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() viajes: ViajesGridResult | null = null;
  @Output() editar = new EventEmitter<string>();
  @Output() eliminar = new EventEmitter<string>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @Output() page = new EventEmitter<GridEvent>();

  dataSource = new MatTableDataSource<Viaje>();
  displayedColumns: string[] = [
    'nombre',
    'destino',
    'duracion',
    'plazas',
    'precio',
    'tipoDeViajeId',
    'estado',
    'fechaSalida',
    'enOferta',
    'actions',
  ];
  totalItems = 0;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.viajes) {
      this.dataSource.data = [...changes.viajes.currentValue.rows];
      this.totalItems = changes.viajes.currentValue.count;
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  pageChanged(ev: PageEvent) {
    if (ev) {
      this.page.emit({
        page: ev.pageIndex + 1,
        pageSize: ev.pageSize,
      });
    }
  }
}
