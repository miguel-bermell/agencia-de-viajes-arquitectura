import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './services/http-auth.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './views/app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpLoaderInterceptor } from './services/http-loader.interceptor';
registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoaderInterceptor,
      multi: true,
    },
  ],
  exports: [AppComponent],
})
export class CoreModule {}
