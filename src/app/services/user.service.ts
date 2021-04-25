import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { User } from '../interfaces/user';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: User;
  error: string;

  constructor(private http: HttpClient, private _utilitiesService: UtilitiesService) {
    if (typeof sessionStorage.getItem('columns-user') !== 'undefined') {
      this.user = JSON.parse(sessionStorage.getItem('columns-user'));
    }
  }

  saveUser(user): void {
    this.user = user;
    window.sessionStorage.removeItem('columns-user');
    window.sessionStorage.setItem('columns-user', JSON.stringify(user));
  }

  getUser() {
    return this.http.post(environment.baseUrl + 'user/get', "").subscribe(
      data => {
        this.user = data as User;
        window.sessionStorage.removeItem('columns-user');
        window.sessionStorage.setItem('columns-user', JSON.stringify(this.user));
      },
      err => {
        this._utilitiesService.alertError = err.error.message;
      }
    );;
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem('columns-token');
    window.sessionStorage.setItem('columns-token', token);
  }

  public getToken(): string {
    return sessionStorage.getItem('columns-token');
  }

}