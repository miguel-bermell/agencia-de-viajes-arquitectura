import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ClienteList } from '../models/cliente-list-item';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
})
export class ClientesListComponent implements OnInit, AfterViewInit {
  clientes: ClienteList[] = [];
  dataSource = new MatTableDataSource<ClienteList>([]);
  displayedColumns: string[] = [
    'nombre',
    'dni',
    'telefono',
    'estadoCivilDesc',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private clientesModel: ClientesService, private router: Router) {}

  ngOnInit(): void {
    this.clientesModel.getAll().subscribe((clientes) => {
      console.log(clientes);
      // this.clientes = clientes;
      this.dataSource.data = [...clientes];
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  editarClick(id: string) {
    if (id) {
      this.router.navigate(['clientes/editar', id]);
    }
  }

  eliminarClick(id: string) {
    if (id && confirm('Estas seguro que deseas eliminar el cliente?')) {
      this.clientesModel.delete(id).subscribe((result) => {
        console.log(result);
        if (result) {
          this.cargarClientes();
        }
      });
    }
  }

  private cargarClientes() {
    this.clientesModel.getAll().subscribe((result) => {
      this.dataSource.data = result;
    });
  }
}
