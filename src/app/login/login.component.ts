import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  errMessage: string = "";
  hasError: boolean = false;
  loader: boolean = false;

  constructor(
    private loginServ: UserService,
    private router: Router,
    //private node: NodeService
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

    let token = localStorage.getItem('token');

    if (token) {

      this.tokenService.setToken(token);

      if (!this.tokenService.isTokenExpired())
        this.router.navigate(['dashboard']);

    }

  }

  LoginUser() {

    if (this.userForm.invalid)
      return;

    this.loader = true;
    this.hasError = false;

    let infoUser = {
      username: this.userForm.get('username')?.value,
      contraseña: this.userForm.get('password')?.value
    };

    this.loginServ.Login(infoUser).subscribe((res) => {

      //this.node.loadToken(res);
      //if (localStorage.getItem('token') === null || this.tokenService.isTokenExpired()) {
      //}

      localStorage.setItem('token', res);

      this.tokenService.setToken(res);
      this.router.navigate(['dashboard']);

    },
    (err) => {

      this.loader = false;
      this.hasError = true;
      this.errMessage = err['error']['error'];

    });

  }

}
