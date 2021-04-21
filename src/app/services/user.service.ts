import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
/* import { ProjectService } from './project.service';
import { Project } from '../interfaces/project'; */

const USER_CONTROLLER = '/user/';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: User;
  error: string;

  constructor(private http: HttpClient) {
    if (typeof sessionStorage.getItem('dlv-user') !== 'undefined') {
      this.user = JSON.parse(sessionStorage.getItem('dlv-user'));
    }
  }

  saveUser(user): void {
    this.user = user;
    window.sessionStorage.removeItem('dlv-user');
    window.sessionStorage.setItem('dlv-user', JSON.stringify(user));
  }

}