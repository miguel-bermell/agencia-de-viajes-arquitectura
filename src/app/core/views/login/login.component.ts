import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { LoginModelService } from './services/login-model.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = false;
  email = '';

  constructor(
    route: ActivatedRoute,
    private router: Router,
    fb: FormBuilder,
    private loginModel: LoginModelService,
    private authService: AuthService
  ) {
    this.loginForm = fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated) {
      this.router.navigate(['']);
    }
  }

  guardarClick(values: { email: string; password: string }) {
    if (values?.email && values?.password) {
      this.loginModel.login(values).subscribe(
        (usuario) => {
          if (usuario) {
            this.authService.storeUser(usuario);
            this.router.navigate(['']);
            console.log(usuario);
          } else {
            this.error = true;
          }
        }
        // (err) => {
        //   this.error = true;
        //   console.log(err, err.statusText);
        // }
      );
    } else {
      this.error = true;
    }
  }
}
