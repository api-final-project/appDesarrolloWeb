import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'; 

import { User } from '../models/user.model';

import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  providers: [UserService],
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements AfterViewInit, OnInit {

  user: User;
  //users: Array<User>;
  isLogged: boolean;
  dataSrc!: MatTableDataSource<User>;
  displayCols: string[] = [
    'Usuario',
    'Nombre',
    'Apellido Paterno',
    'Apellido Materno',
    'Telefono',
    'Dirección'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService,
              private tokenService: TokenService,
              private router: Router) {
    //this.users = Array<User>();
    this.user = new User();
    this.isLogged = false;
    //this.dataSrc = undefined;
  }

  ngOnInit(): void {

    let token:string | null = "";

    token = this.tokenService.getToken();

    if (token) {

      this.isLogged = true;

      let usr = this.tokenService.getUser();

      if (usr)
        this.user = usr;

      this.userService.Dashboard(token).subscribe(users => {

        this.dataSrc = new MatTableDataSource<User>(users);
        this.dataSrc.paginator = this.paginator;

      });

    } else {

      this.router.navigate(["/"]);

    }

  }

  ngAfterViewInit(): void {
  }

  Logout() {

    localStorage.removeItem('token');
    this.router.navigate(["/"]);

  }

}
