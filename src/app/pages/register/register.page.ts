import { Component, OnInit } from '@angular/core';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'registe-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  email: string;
  password: string;
  streamingServices;

  constructor(public _filmService: FilmService) {
    this.streamingServices = this._filmService.getStreamingServices();
  }

  register() {
    console.log('tts', this.email);
  }

  removeStreamingServices(streamingServices) {
    console.log('removeStreamingServices', streamingServices)
  }

  addStreamingService(streamingServices) {
    console.log('addStreamingService', streamingServices)
  }

  ngOnInit(): void {
  }

}
