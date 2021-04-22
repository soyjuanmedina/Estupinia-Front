import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  recomendedMovies: Array<Movie>;

  constructor(public _movieService: MovieService, public _userService: UserService) {
    this.recomendedMovies = this._movieService.getRecomendedMovies();
  }

  ngOnInit(): void {
  }

}
