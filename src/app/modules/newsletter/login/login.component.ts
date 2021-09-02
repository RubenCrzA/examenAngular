import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewslaterServiceService } from '../services/newslater-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private newslaterServiceService: NewslaterServiceService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const loginArguments = this.loginForm.value;
    this.newslaterServiceService
      .validarLogin(loginArguments.usuario, loginArguments.password)
      .subscribe(
        (response) => {
          if (response.length > 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Login exitoso!',
              detail: 'Los datos se encuentran en la base de datos',
            });
            setTimeout(() => {
              this.router.navigate(['/news']);
            }, 3000);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Login incorrecto',
              detail: 'los datos no se encuentran en la base de datos',
            });
          }
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login incorrecto',
            detail: 'Ocurrio un error!',
          });
        }
      );
  }

  redirectRegister() {
    this.router.navigate(['/registro']);
  }
}
