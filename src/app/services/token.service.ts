import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { User } from '../models/user.model';

@Injectable()
export class TokenService {

    token: string | null;
    decodedToken: User | null;

    constructor() {
        this.token = null;
        this.decodedToken = null;
    }

    setToken(token: string | null) {

      if (token) {
        this.token = token;
      }

    }

    getToken(): string | null {
      return this.token === "" ? null : this.token;
    }

    decodeToken() {
      if (this.token) {
        this.decodedToken = jwt_decode(this.token);
      }
    }

    getUser() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken : null;
    }

    getExpiryTime() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken.exp : null;
    }

    isTokenExpired(): boolean {

      const expiryTime: Date | null = this.getExpiryTime();

      if (expiryTime) {
        return ((1000 * +expiryTime) - (+new Date())) < 5000;
      } else {
        return true;
      }

    }
}