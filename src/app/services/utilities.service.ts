import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  alertSuccess: string;
  alertError: string;
  loading: boolean;

  constructor(private http: HttpClient) {
  }

  sendMail(params) {
    let url = environment.baseUrl + 'utilities/sendMail';
    return this.http.post(url, params)
  }

  clearAlerts() {
    delete this.alertSuccess;
    delete this.alertError;
    this.loading = false;
  }

  cloneObject(object) {
    return JSON.parse(JSON.stringify(object));
  }

}