import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading = false;
  isLoggedIn = false;
  title = 'agencia-de-viajes-routing';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationStart))
    //   .subscribe((ev: any) => {
    //     this.isLoggedIn = ev?.url.toLowerCase().includes('login');
    //   });
  }

  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  ngOnInit(): void {
    this.loaderService.loading.pipe(delay(0)).subscribe((x) => {
      this.loading = x;
    });
  }
  cerrarSesion() {
    this.authService.logOutUser();
    this.router.navigate(['login']);
  }

  isLogged(): boolean {
    return this.authService.isUserAuthenticated;
  }
}
