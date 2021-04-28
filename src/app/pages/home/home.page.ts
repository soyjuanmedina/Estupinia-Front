import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';
declare let $: any;

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  constructor(public _articleService: ArticleService, public _userService: UserService,
    public _utilitiesService: UtilitiesService, public router: Router) {
    this.getRecomendedArticles();
  }

  getRecomendedArticles() {
    this._utilitiesService.loading = true;
    this._articleService.getRecomendedArticles().subscribe(
      data => {
        let response = data as any;
        this._articleService.articles = response;
        this._articleService.articles = this._articleService.demoArticles.concat(this._articleService.articles);
        let dateString = this._articleService.articles[0].date;
        let newDate = new Date(dateString);
        console.log('newDate', newDate);
        // this.recomendedArticles = this._articleService.demoArticles;
        console.log('',);
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los artículos"
        this._utilitiesService.loading = false;
      }
    );
  }

  showArticle(articleId) {
    if (this._userService.user) {
      this.router.navigate(['/article', articleId]);
    } else {
      $('#identifyModal').modal('show');
    }
  }

  ngOnInit(): void {
  }

}
