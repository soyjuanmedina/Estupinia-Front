import { environment } from "../../environments/environment";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../interfaces/article';
import { UtilitiesService } from "./utilities.service";
import { Media } from "../interfaces/media";
import { AppConstants } from '../appConstants';
import { Observable, of } from "rxjs";
import { ArticlePage } from "../pages/article/article.page";

const USER_CONTROLLER = '/user/';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  articles: Array<Article>
  allArticles: Array<Article>
  medias: Array<string>
  authors: Array<string>
  tags: Array<string>

  demoArticles: Array<Article> = [
    {
      title: "Artículo 1",
      id: "1",
      media: "El Pais",
      author: "Autor 1",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Editorial",
      tags: ["Sociedad", "Economía"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 2",
      id: "2",
      media: "El Mundo",
      author: "Autor 2",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Economía",
      tags: ["Economía"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 3",
      id: "3",
      media: "El Pais",
      author: "Autor 3",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Epigrafe 3",
      tags: ["Deportes"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 4",
      id: "4",
      media: "El Pais",
      author: "Autor 4",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Editorial",
      tags: ["Deportes", "Economía"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 5",
      id: "5",
      media: "El Mundo",
      author: "Autor 5",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Economía",
      tags: ["Economía", "Medio Ambiente"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 6",
      id: "6",
      media: "El Pais",
      author: "Autor 6",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Epigrafe 6",
      tags: ["Deportes", "Cultura"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 7",
      id: "7",
      media: "El Pais",
      author: "Autor 7",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Editorial",
      tags: ["Sociedad"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 8",
      id: "8",
      media: "El Mundo",
      author: "Autor 8",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Economía",
      tags: ["Economía", "España"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 9",
      id: "9",
      media: "El Pais",
      author: "Autor 9",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Epigrafe 9",
      tags: ["Deportes", "Cultura"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 10",
      id: "10",
      media: "El Pais",
      author: "Autor 1",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Editorial",
      tags: ["Sociedad"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 11",
      id: "11",
      media: "El Mundo",
      author: "Autor 11",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Economía",
      tags: ["Economía", "Medio Ambiente"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 12",
      id: "12",
      media: "El Pais",
      author: "Autor 12",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Epigrafe 12",
      tags: ["Deportes", "Economia"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 13",
      id: "13",
      media: "El Pais",
      author: "Autor 13",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Editorial",
      tags: ["Sociedad", "Economía", "Deportes"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 14",
      id: "14",
      media: "El Mundo",
      author: "Autor 14",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Economía",
      tags: ["Economía", "Opinión"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 15",
      id: "15",
      media: "El Pais",
      author: "Autor 15",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Epigrafe 15",
      tags: ["Deportes"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 16",
      id: "16",
      media: "El Pais",
      author: "Autor 16",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Editorial",
      tags: ["Sociedad", "Economía", "Cultura"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 17",
      id: "17",
      media: "El Mundo",
      author: "Autor 17",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Economía",
      tags: ["Economía", "Deportes"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 18",
      id: "18",
      media: "El Pais",
      author: "Autor 18",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Epigrafe 18",
      tags: ["Deportes"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 19",
      id: "19",
      media: "El Pais",
      author: "Autor 1",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Editorial",
      tags: ["Economía"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    },
    {
      title: "Artículo 20",
      id: "20",
      media: "El Mundo",
      author: "Autor 20",
      date: "24-04-2021",
      img: "https://imagenes.elpais.com/resizer/AAwYcBUZn7OenREeLjgFZiHC8-g=/828x0/filters:focal(4035.000060200691x2735.5000408366323:4045.000060200691x2745.5000408366323)/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7KSOM52VLJAVXC4VMXHS6SSE6M.jpg",
      fullcontent: AppConstants.LOREIPSUM,
      epigraph: "Economía",
      tags: ["Economía", "España"],
      excrept: AppConstants.LOREIPSUMEXCREPT
    }
  ]
  error: string;

  constructor(private http: HttpClient, private _utilitiesService: UtilitiesService) {
  }

  getArticle(id) {
    if (this.articles) {
      return this.articles.find(article => article.id == id);
    }
  }

  getRecomendedArticles() {
    this._utilitiesService.loading = true;
    return of(this.demoArticles);
    // return this.http.post(environment.baseUrl + 'article/recomended', "");
  }

  getDBMedias() {
    return this.http.post(environment.baseUrl + 'article/medias', "");
  }

  getMedias() {
    let medias = [];
    this.demoArticles.forEach(article => {
      if (medias.indexOf(article.media) === -1) {
        medias.push(article.media)
      }
    });
    this._utilitiesService.loading = true;
    return of(medias);
    // return this.http.post(environment.baseUrl + 'article/medias', "");
  }

  getAuthors() {
    let authors = [];
    this.demoArticles.forEach(article => {
      if (authors.indexOf(article.author) === -1) {
        authors.push(article.author)
      }
    });
    this._utilitiesService.loading = true;
    return of(authors);
    // return this.http.post(environment.baseUrl + 'article/medias', "");
  }

  getTags() {
    let tags = [];
    this.demoArticles.forEach(article => {
      article.tags.forEach(tag => {
        if (tags.indexOf(tag) === -1) {
          tags.push(tag)
        }
      });
    });
    this._utilitiesService.loading = true;
    return of(tags);
    // return this.http.post(environment.baseUrl + 'article/medias', "");
  }

  getArticlesByMedia(media) {
    this._utilitiesService.loading = true;
    return this.http.post(environment.baseUrl + 'article/getArticlesByMedia', media);
  }

  confirmReadPremium(article) {
    article.tags = article.tags.toString();
    this._utilitiesService.loading = true;
    return this.http.post(environment.baseUrl + 'article/confirmreadpremium', article);
  }

  buyPremiumAccess(amount) {
    this._utilitiesService.loading = true;
    return this.http.post(environment.baseUrl + 'article/buypremiumaccess', amount);
  }

  buyAccess(type) {
    this._utilitiesService.loading = true;
    return this.http.post(environment.baseUrl + 'article/buyaccess', type);
  }

}