import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';

let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
};

@Injectable()
export class UserService {

    constructor(private http:HttpClient) {}

    Login(credentials: any){

        return this.http.post<string>('/login', credentials, httpOptions);

    }

    SignUser(credentials: User){

        return this.http.post<any>('/signup', credentials, httpOptions);

    }

    Dashboard(token: string){

        return this.http.get<User[]>('/dash', {
            headers: httpOptions.headers.append('token', token)
        });

    }

}