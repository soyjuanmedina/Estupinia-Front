import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  alertSuccess: string;
  alertError: string;

  constructor() {
  }

  clearAlerts() {
    delete this.alertSuccess;
    delete this.alertError;
  }

}