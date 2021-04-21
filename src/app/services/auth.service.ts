import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { UtilitiesService } from './utilities.service';

const AUTH_CONTROLLER = '/auth/';

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
    streamingServices: [
      {
        id: 1,
        name: "Netflix"
      },
      {
        id: 2,
        name: "Amazon"
      }
    ]
  }

  constructor(private http: HttpClient, private _userService: UserService, private router: Router,
    public _utilitiesService: UtilitiesService) { }

  /* login(credentials): Observable<any> {
    return this.http.post(AUTH_CONTROLLER + 'login', credentials, httpOptions);
  } */

  login(credentials) {
    this._utilitiesService.clearAlerts();
    if (credentials.email == "user@user.com" && credentials.password == "12345") {
      this._userService.saveUser(this.user);
      this.router.navigateByUrl('/');
    } else {
      this._utilitiesService.alertError = "El usuario no existe. Prueba a loguearte con usuario: user@user.com y password 12345"
    }
  }




  logout(): void {
    delete this._userService.user;
    sessionStorage.clear();
  }

  register(user) {
    if (user.email == "user@user.com" && user.password == "12345") {
      this._utilitiesService.alertSuccess = "Gracias por registrate en Donde lo veo. Ahora ya puedes hacer login"
    } else {
      this._utilitiesService.alertError = "Se ha producido un error. Prueba a registrarte con usuario: user@user.com y password 12345"
    }
    // return this.http.post(AUTH_CONTROLLER + 'register', user, httpOptions);
  }
}