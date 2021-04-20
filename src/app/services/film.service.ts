import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../interfaces/film';
/* import { ProjectService } from './project.service';
import { Project } from '../interfaces/project'; */

const USER_CONTROLLER = '/user/';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class FilmService {

  demoFilms = [
    {
      title: "Iron Man",
      id: 1,
      director: ["Jon Favreau"],
      writer: ["Arthur Marcum", "Matt Holloway"],
      casting: ["Robert Downey Jr.", "Terrence Howard", "Gwyneth Paltrow", "Jeff Bridges", "Stan Lee"],
      img: "https://pics.filmaffinity.com/iron_man-108960873-mmed.jpg",
      synopsis: "Iron Man es la historia del industrial multimillonario y genio inventor Tony Stark (ROBERT DOWNEY JR.). Como consejero delegado de Industrias Stark, el mayor contratista de armamento del Gobierno norteamericano, Tony se ha hecho célebre por proteger durante décadas los intereses norteamericanos en todo el mundo."
    },
    {
      title: "Spider-Man",
      id: 2,
      director: ["Sam Raimi"],
      writer: ["David Koepp", "(Cómic: Stan Lee, Steve Ditko)"],
      casting: ["Tobey Maguire", "Kirsten Dunst", "Willem Dafoe", "James Franco", "Rosemary Harris", "Cliff Robertson", "J.K. Simmons"],
      img: "https://pics.filmaffinity.com/spider_man_spiderman-945131720-mmed.jpg",
      synopsis: "Tras la muerte de sus padres, Peter Parker, un tímido estudiante, vive con su tía May y su tío Ben. Precisamente debido a su retraimiento no es un chico muy popular en el instituto. Un día le muerde una araña que ha sido modificada genéticamente; a la mañana siguiente, descubre estupefacto que posee la fuerza y la agilidad de ese insecto. Las aventuras del hombre araña se basan en el famoso cómic de Stan Lee y Steve Ditko."
    },
    {
      title: "Iron Man",
      id: 1,
      director: ["Jon Favreau"],
      writer: ["Arthur Marcum", "Matt Holloway"],
      casting: ["Robert Downey Jr.", "Terrence Howard", "Gwyneth Paltrow", "Jeff Bridges", "Stan Lee"],
      img: "https://pics.filmaffinity.com/iron_man-108960873-mmed.jpg",
      synopsis: "Iron Man es la historia del industrial multimillonario y genio inventor Tony Stark (ROBERT DOWNEY JR.). Como consejero delegado de Industrias Stark, el mayor contratista de armamento del Gobierno norteamericano, Tony se ha hecho célebre por proteger durante décadas los intereses norteamericanos en todo el mundo."
    },
    {
      title: "Spider-Man",
      id: 2,
      director: ["Sam Raimi"],
      writer: ["David Koepp", "(Cómic: Stan Lee, Steve Ditko)"],
      casting: ["Tobey Maguire", "Kirsten Dunst", "Willem Dafoe", "James Franco", "Rosemary Harris", "Cliff Robertson", "J.K. Simmons"],
      img: "https://pics.filmaffinity.com/spider_man_spiderman-945131720-mmed.jpg",
      synopsis: "Tras la muerte de sus padres, Peter Parker, un tímido estudiante, vive con su tía May y su tío Ben. Precisamente debido a su retraimiento no es un chico muy popular en el instituto. Un día le muerde una araña que ha sido modificada genéticamente; a la mañana siguiente, descubre estupefacto que posee la fuerza y la agilidad de ese insecto. Las aventuras del hombre araña se basan en el famoso cómic de Stan Lee y Steve Ditko."
    },
    {
      title: "Iron Man",
      id: 1,
      director: ["Jon Favreau"],
      writer: ["Arthur Marcum", "Matt Holloway"],
      casting: ["Robert Downey Jr.", "Terrence Howard", "Gwyneth Paltrow", "Jeff Bridges", "Stan Lee"],
      img: "https://pics.filmaffinity.com/iron_man-108960873-mmed.jpg",
      synopsis: "Iron Man es la historia del industrial multimillonario y genio inventor Tony Stark (ROBERT DOWNEY JR.). Como consejero delegado de Industrias Stark, el mayor contratista de armamento del Gobierno norteamericano, Tony se ha hecho célebre por proteger durante décadas los intereses norteamericanos en todo el mundo."
    },
    {
      title: "Spider-Man",
      id: 2,
      director: ["Sam Raimi"],
      writer: ["David Koepp", "(Cómic: Stan Lee, Steve Ditko)"],
      casting: ["Tobey Maguire", "Kirsten Dunst", "Willem Dafoe", "James Franco", "Rosemary Harris", "Cliff Robertson", "J.K. Simmons"],
      img: "https://pics.filmaffinity.com/spider_man_spiderman-945131720-mmed.jpg",
      synopsis: "Tras la muerte de sus padres, Peter Parker, un tímido estudiante, vive con su tía May y su tío Ben. Precisamente debido a su retraimiento no es un chico muy popular en el instituto. Un día le muerde una araña que ha sido modificada genéticamente; a la mañana siguiente, descubre estupefacto que posee la fuerza y la agilidad de ese insecto. Las aventuras del hombre araña se basan en el famoso cómic de Stan Lee y Steve Ditko."
    }
  ]

  demoStreamingServices = [
    {
      id: 1,
      name: "Netflix"
    },
    {
      id: 2,
      name: "Amazon"
    }
  ]
  user: Film;
  error: string;

  constructor(private http: HttpClient) {
  }

  getRecomendedFilms() {
    return this.demoFilms;
    /* return this.http.post('/films/getRecomendations', "").subscribe(
      data => {
        this.user = data as Film;
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(this.user));
      },
      err => {
        this.error = err.error.message;
      }
    );; */
  }

  getStreamingServices() {
    return this.demoStreamingServices;
  }
}