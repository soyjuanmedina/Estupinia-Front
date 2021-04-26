import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  recomendedArticles: Array<Article>;

  constructor(public _articleService: ArticleService, public _userService: UserService,
    public _utilitiesService: UtilitiesService,) {
    this.getRecomendedArticles();
  }

  getRecomendedArticles() {
    this._utilitiesService.loading = true;
    this._articleService.getRecomendedArticles().subscribe(
      data => {
        let response = data as any;
        // this.recomendedArticles = response;
        this.recomendedArticles = this._articleService.demoArticles;
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los artículos"
        this._utilitiesService.loading = false;
      }
    );
  }

  ngOnInit(): void {
  }

}
