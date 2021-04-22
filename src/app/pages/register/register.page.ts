import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StreamingService } from '../../interfaces/streamingService';
import { AuthService } from '../../services/auth.service';
import { UtilitiesService } from '../../services/utilities.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'registe-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  newUser: User = {
    email: "",
    password: ""
  };

  newUserForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required])
  });

  streamingServices: Array<StreamingService>;
  userStreamingServices: Array<StreamingService> = [];


  constructor(public _movieService: MovieService, public _authService: AuthService,
    public _utilitiesService: UtilitiesService) {
    this._utilitiesService.clearAlerts();
  }

  register() {
    this._utilitiesService.clearAlerts();
    this._authService.register(this.newUserForm.value);
  }

  removeStreamingServices(streamingServices) {
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
