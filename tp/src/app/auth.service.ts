import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService ) {}
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }
}



