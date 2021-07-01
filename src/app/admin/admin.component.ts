import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '../shared/modals/confirmation.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.confirmationService.alert({
      contenido: 'Estas accediendo a un area restringida',
      aceptar: 'Confirmar',
    });
  }
}
