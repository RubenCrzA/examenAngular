import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NewslaterServiceService } from '../services/newslater-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registroForm: FormGroup;
  constructor(
    private newslaterServiceService: NewslaterServiceService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    let user = this.registroForm.value;
    this.newslaterServiceService.registrarUsuarios(user).subscribe(
      (response) => {
        console.log(user);
        console.log(response);
        if (response.usuario === user.usuario) {
          this.messageService.add({
            severity: 'success',
            summary: 'Usuario registrado!',
            detail: 'Los datos se han registrado exitosamente',
          });
          setTimeout(() => {
            this.router.navigate(['/news']);
          }, 3000);
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Usuario no registrado!',
          detail: 'pruebe mas tarde!',
        });
      }
    );
  }
}
