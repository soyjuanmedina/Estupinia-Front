import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'contact-page',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss']
})
export class ContactPage implements OnInit {

  contactForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    message: new FormControl('', [
      Validators.required])
  });

  constructor(public http: HttpClient, public _utilitiesService: UtilitiesService) { }

  contactMe() {
    console.log('contactForm', this.contactForm.value);
    this._utilitiesService.loading = true;
    delete this._utilitiesService.alertSuccess;
    delete this._utilitiesService.alertError;
    this._utilitiesService.sendMail(this.contactForm.value).subscribe(data => {
      if (data) {
        this._utilitiesService.alertSuccess = "Gracias por tu mensaje, tendremos en cuenta tus comentarios.";
      } else {
        this._utilitiesService.alertError = "Se ha producido un error, por favor vuelve a intentarlo en otro momento.";
        delete this._utilitiesService.alertSuccess;
      }
      this._utilitiesService.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
