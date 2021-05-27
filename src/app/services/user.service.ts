import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { User } from '../interfaces/user';
import { environment } from "../../environments/environment";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: User;
  error: string;

  constructor(private http: HttpClient, private _utilitiesService: UtilitiesService, public router: Router) {
    if (typeof sessionStorage.getItem('estupinia-user') !== 'undefined') {
      this.user = JSON.parse(sessionStorage.getItem('estupinia-user'));
    }
  }

  saveUser(user): void {
    this.user = user;
    window.sessionStorage.removeItem('estupinia-user');
    window.sessionStorage.setItem('estupinia-user', JSON.stringify(user));
  }

  getUser() {
    return this.http.post(environment.baseUrl + 'user/get', "").subscribe(
      data => {
        this.user = data as User;
        if (!this.user.active) {
          delete this.user;
          sessionStorage.clear();
          this._utilitiesService.alertError = "Cuenta inactiva, por favor, confirme su mail antes de loguearse"
          console.log('asdf',);
        } else {
          window.sessionStorage.removeItem('estupinia-user');
          window.sessionStorage.setItem('estupinia-user', JSON.stringify(this.user));
          this.router.navigate(['/']);
        }
      },
      err => {
        this._utilitiesService.alertError = err.error.message;
      }
    );;
  }

  confirmEmail(params) {
    this._utilitiesService.loading = true;
    return this.http.post(environment.baseUrl + 'user/confirmemail', params);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem('estupinia-token');
    window.sessionStorage.setItem('estupinia-token', token);
  }

  public getToken(): string {
    return sessionStorage.getItem('estupinia-token');
  }

}