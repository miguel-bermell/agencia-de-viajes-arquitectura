import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { LoginModelService } from '../views/login/services/login-model.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly APP_USER = 'APP_USER';
  constructor(private loginService: LoginModelService) {}

  get isUserAuthenticated(): boolean {
    return !!localStorage.getItem(this.APP_USER);
  }

  get bearer(): string {
    const bearer = localStorage.getItem(this.APP_USER);
    if (bearer) {
      const user: Usuario = JSON.parse(bearer);
      return user.bearer;
    }
    return '';
  }

  get user(): Usuario | null {
    const bearer = localStorage.getItem(this.APP_USER);
    return bearer ? new Usuario(bearer) : null;
  }

  storeUser(usuario: Usuario) {
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario));
    // this.initializeRefreshToken(usuario)
  }

  logOutUser(): void {
    localStorage.removeItem(this.APP_USER);
  }

  initializeRefreshToken(usuario: Usuario): void {
    const expires_in = usuario.expires_in * 0.75;

    setTimeout(() => {
      this.loginService.refresh(usuario).subscribe((x) => {
        usuario.bearer = x.bearer;
        usuario.expires_in = x.expires_in;
        usuario.refresh_token = x.refresh_token;

        this.storeUser(usuario);
      });
    }, expires_in);
  }
}
