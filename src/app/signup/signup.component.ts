import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AvisoComponent } from '../aviso/aviso.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  providers: [UserService],
  styleUrls: ['../login/login.component.css']
  //styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hasError: boolean = false;
  loader: boolean = false;
  errMessage: string = "";

  private patterns: any = {
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
    phone: "^[0-9]*$"
  };

  userForm = new FormGroup({
    username: new FormControl('',    [
      Validators.required,
      Validators.minLength(2)
    ]),
    nombre:   new FormControl('',    [
      Validators.required,
      Validators.minLength(2)
    ]),
    ape_paterno: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    ape_materno: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12),
      Validators.pattern(this.patterns['phone']),
    ]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    contraseña: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.patterns['password'])
    ]),
  });

  constructor(
    private signSer: UserService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    let accept = localStorage.getItem('Accept');

    if (!accept) {

      this.dialog.open(AvisoComponent);
      localStorage.setItem('Accept', 'ok')

    }


  }

  SignUp() {

    if (this.userForm.invalid) {
      return;
    }

    this.loader = true;
    this.hasError = false;

    let usr: User = new User();

    usr.Username    = this.userForm.get('username')?.value as string;
    usr.Nombre      = this.userForm.get('nombre')?.value as string;
    usr.Ape_paterno = this.userForm.get('ape_paterno')?.value as string;
    usr.Ape_materno = this.userForm.get('ape_materno')?.value as string;
    usr.Telefono    = this.userForm.get('telefono')?.value as string;
    usr.Direccion   = this.userForm.get('direccion')?.value as string;
    usr.Contraseña  = this.userForm.get('contraseña')?.value as string;

    this.signSer.SignUser(usr).subscribe(() => {
      
      localStorage.removeItem('token');
      this.router.navigate(['user-login']);

    },
    (err) => {

      this.loader = false;
      this.hasError = true;
      this.errMessage = err['error']['error'];

    });

  }

  getErrorPhone(): string {

    if (this.userForm.hasError('required', 'telefono')) {
      return 'Campo requerido';
    }

    if (this.userForm.hasError('minlength', 'telefono')) {
      return 'Al menos 6 numeros';
    }

    if (this.userForm.hasError('maxlength', 'telefono')) {
      return 'No mas de 12 numeros';
    }

    if (this.userForm.hasError('pattern', 'telefono')) {
      return 'Solo numeros';
    }

    return '';

  }

  getErrorPassword(): string {

    if (this.userForm.hasError('required', 'contraseña')) {
      return 'Campo requerido';
    }

    if (this.userForm.hasError('minlength', 'contraseña')) {
      return 'Al menos 8 caracteres';
    }

    if (this.userForm.hasError('pattern', 'contraseña')) {
      return 'Debe tener al menos una minuscula, una mayuscula, un numero y un simbolo';
    }

    return '';

  }

  getErrorGeneric(field: string): string {

    if (this.userForm.hasError('required', field)) {
      return 'Campo requerido';
    }

    if (this.userForm.hasError('minlength', field)) {
      return 'Al menos 2 caracteres';
    }

    return '';

  }

}
