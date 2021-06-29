import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatFecha } from 'src/app/core/utils/dates-helpers';
import { Cliente } from '../models/cliente';
import { EstadoCivil } from '../models/enums/estado-civil.enum';
import { ClientesService } from '../services/clientes.service';
import { IdValor } from '../services/id-valor';

@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.scss'],
})
export class ClientesEditComponent implements OnInit {
  clientesForm: FormGroup;
  estadoCivil: any = [];

  id: string = '';

  submited = false;

  constructor(
    fb: FormBuilder,
    private clientesModel: ClientesService,
    route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe((params) => {
      //Ruta del navegador para ver si tenemos parametro ID en la ruta
      console.log(params);
      this.id = params.id || '';
    });

    this.clientesForm = fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.email],
      dni: [''],
      telefono: [''],
      estadoCivilId: [EstadoCivil.desconocido],
      direccion: [''],
      fechaNacimiento: null,
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.clientesModel.getById(this.id).subscribe((cliente) => {
        if (cliente) {
          this.clientesForm.patchValue(cliente);
          if (cliente?.fechaNacimiento) {
            const t = formatFecha(cliente?.fechaNacimiento);
            this.clientesForm.controls.fechaNacimiento.setValue(t);
          }
        }
      });
    }
    this.clientesModel.getEstadoCivil().subscribe((res) => {
      this.estadoCivil = res;
      // res.filter((e) => e.id !== EstadoCivil.desconocido);
    });
  }

  guardarClick(form: FormGroup): void {
    this.submited = true;

    if (form.valid) {
      const cliente: Cliente = form.value;

      if (cliente.fechaNacimiento) {
        cliente.fechaNacimiento = new Date(cliente.fechaNacimiento);
      }

      this.clientesModel.save(cliente).subscribe((x) => {
        this.router.navigate(['clientes']);
      });
      this.resetForm();
    }
  }

  resetForm(): void {
    this.submited = false;
    this.clientesForm.reset();
  }
}
