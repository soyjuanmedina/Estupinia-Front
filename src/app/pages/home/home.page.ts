import { Component, OnInit } from '@angular/core';
import { Film } from '../../interfaces/film';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  recomendedFilms: Array<Film>;

  constructor(public _filmService: FilmService) {
    this.recomendedFilms = this._filmService.getRecomendedFilms();
  }

  ngOnInit(): void {
  }

}
