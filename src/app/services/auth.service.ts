import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { UtilitiesService } from './utilities.service';
import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = {
    email: "user@user.com",
    name: "Juan",
    surname: "Español",
    subscription: "Free"
  }

  constructor(private http: HttpClient, private _userService: UserService, private router: Router,
    public _utilitiesService: UtilitiesService) { }

  /* login(credentials): Observable<any> {
    return this.http.post(AUTH_CONTROLLER + 'login', credentials, httpOptions);
  } */

  login(credentials) {
    return this.http.post(environment.baseUrl + 'auth/login', credentials, httpOptions);
  }




  logout(): void {
    delete this._userService.user;
    sessionStorage.clear();
  }

  register(user) {
    console.log('user', user);
    return this.http.post(environment.baseUrl + 'auth/register', user, httpOptions);
  }
}