import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  recomendedArticles: Array<Article>;

  constructor(public _articleService: ArticleService, public _userService: UserService) {
    this.recomendedArticles = this._articleService.getRecomendedArticles();
  }

  ngOnInit(): void {
  }

}
