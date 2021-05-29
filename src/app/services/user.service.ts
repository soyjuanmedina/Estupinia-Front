import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { User } from '../interfaces/user';
import { environment } from "../../environments/environment";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: User;
  users: Array<User>;
  allUsers: Array<User>
  schedules: Array<string>
  themes: Array<string>
  error: string;

  demoUsers: Array<User> = [
    {
      email: "mail1@mail.com",
      active: true,
      id: 1,
      name: "Juan",
      surname: "Medina",
      schedule: ["10-2", "5-7"],
      themes: ["moda", "ropa"]
    },
    {
      email: "mail2@mail.com",
      active: true,
      id: 2,
      name: "Manolo",
      surname: "Medina",
      schedule: ["12-2", "9-12"],
      themes: ["actualidad", "salud"]
    }
  ]

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

  getDBMedias() {
    return this.http.post(environment.baseUrl + 'article/medias', "");
  }

  getSchedules() {
    let schedules = [];
    this.demoUsers.forEach(user => {
      if (schedules.indexOf(user.schedule) === -1) {
        schedules.push(user.schedule)
      }
    });
    this._utilitiesService.loading = true;
    return of(schedules);
    // return this.http.post(environment.baseUrl + 'article/medias', "");
  }

  getThemes() {
    let themes = [];
    this.demoUsers.forEach(user => {
      if (themes.indexOf(user.themes) === -1) {
        themes.push(user.themes)
      }
    });
    this._utilitiesService.loading = true;
    return of(themes);
    // return this.http.post(environment.baseUrl + 'article/medias', "");
  }

  getRecomendedUsers() {
    this._utilitiesService.loading = true;
    return of(this.demoUsers);
    // return this.http.post(environment.baseUrl + 'article/recomended', "");
  }

}