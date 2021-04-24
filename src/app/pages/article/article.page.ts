import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'article-page',
  templateUrl: './article.page.html'
})
export class ArticlePage implements OnInit {

  article: Article;

  constructor(private route: ActivatedRoute, private router: Router,
    private _articleService: ArticleService) {
    window.scroll(0, 0);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.article = this._articleService.getArticle(params['id']);
    });
  }

}
