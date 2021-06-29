import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() cerrarSesion = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}
  viajes(): void {
    this.router.navigate(['viajes/editar']);
  }

  allViajes(): void {
    this.router.navigate(['viajes']);
  }

  logOut() {
    if (confirm('¿Deseas cerrar sesión?')) {
      this.cerrarSesion.emit(confirm);
    }
  }
}
