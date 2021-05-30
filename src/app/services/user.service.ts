import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { User } from '../interfaces/user';
import { environment } from "../../environments/environment";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { of } from "rxjs";
import { Theme } from '../interfaces/theme';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: User;
  conectedUsers: Array<User>;
  usersToDate: Array<User>;
  allUsers: Array<User>
  weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  themes;
  error: string;

  demoUsers: Array<User> = [
    {
      email: "mail1@mail.com",
      active: true,
      id: 1,
      name: "Juan",
      surname: "Medina",
      themes: [{
        id: 1,
        name: "Actualidad"
      },
      {
        id: 2,
        name: "Economía"
      }
      ],
      img: "assets/img/img-profile.png"
    },
    {
      email: "mail2@mail.com",
      active: true,
      id: 2,
      name: "Manolo",
      surname: "Medina",
      themes: [{
        id: 1,
        name: "Actualidad"
      },],
      img: "assets/img/img-profile.png"
    }
  ]

  constructor(private http: HttpClient, private _utilitiesService: UtilitiesService, public router: Router) {
    if (typeof sessionStorage.getItem('estupinia-user') !== 'undefined') {
      this.user = JSON.parse(sessionStorage.getItem('estupinia-user'));
    }
  }

  updateUser(user: User) {
    console.log(1, user);
    return this.http.post(environment.baseUrl + 'user/update', user).subscribe(
      data => {
        console.log(data);
        this.user = data as User;
      },
      err => {
        console.log(err.error.message);
      }
    );
  }

  saveUser(user): void {
    this.user = user;
    window.sessionStorage.removeItem('estupinia-user');
    window.sessionStorage.setItem('estupinia-user', JSON.stringify(user));
  }

  getUserToComunicate(id) {
    if (this.conectedUsers) {
      return this.conectedUsers.find(user => user.id == id);
    }
  }

  getUser() {
    return this.http.post(environment.baseUrl + 'user/get', "").subscribe(
      data => {
        this.user = data as User;
        if (!this.user.active) {
          delete this.user;
          sessionStorage.clear();
          this._utilitiesService.alertError = "Cuenta inactiva, por favor, confirme su mail antes de loguearse"
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
    this._utilitiesService.loading = true;
    this.http.post(environment.baseUrl + 'theme/get', "").subscribe(
      data => {
        let response = data as any;
        this.themes = response;
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los temas"
        this._utilitiesService.loading = false;
      }
    );
  }

  getConectedUsers() {
    this._utilitiesService.loading = true;
    this.http.post(environment.baseUrl + 'user/getconnected', "").subscribe(
      data => {
        let response = data as any;
        this.conectedUsers = response;
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los conectedUsers"
        this._utilitiesService.loading = false;
      }
    );
  }

  getUsersToDate(theme) {
    this._utilitiesService.loading = true;
    return of(this.demoUsers);
    // return this.http.post(environment.baseUrl + 'article/recomended', "");
  }

}