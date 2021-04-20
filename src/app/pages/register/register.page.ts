import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { FilmService } from '../../services/film.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StreamingService } from '../../interfaces/streamingService';

@Component({
  selector: 'registe-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  newUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required])
  });

  streamingServices: Array<StreamingService>;
  userStreamingServices: Array<StreamingService> = [];


  constructor(public _filmService: FilmService) {
    this.streamingServices = this._filmService.getStreamingServices();
  }

  register() {
    console.log('UserStreamingServices', this.userStreamingServices);
    console.log('newUserForm', this.newUserForm.value);
  }

  removeStreamingServices(streamingServices) {
    console.log('removeStreamingServices', streamingServices);
    this.userStreamingServices = this.userStreamingServices.filter(function (value, index, arr) {
      return value != streamingServices;
    });
  }

  addStreamingService(streamingServices) {
    if (this.userStreamingServices.indexOf(streamingServices) === -1) {
      this.userStreamingServices.push(streamingServices)
    }
  }

  ngOnInit(): void {
  }

}
