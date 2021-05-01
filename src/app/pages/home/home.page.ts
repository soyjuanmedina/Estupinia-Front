import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from '../../interfaces/article';
import { Media } from '../../interfaces/media';
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

  selectedArticle: Article;
  mediaSearchedArticles: Media;
  selectedMedia: Media;
  isVisible = $('#searchingAccordion').is(":visible");

  constructor(public _articleService: ArticleService, public _userService: UserService,
    public _utilitiesService: UtilitiesService, public router: Router) {
    this._utilitiesService.clearAlerts();
    if (!this._articleService.articles) {
      this.getRecomendedArticles();
    }
    if (!this._articleService.medias) {
      this.getMedias();
    }
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }

  getMedias() {
    this._articleService.getMedias().subscribe(
      data => {
        let response = data as any;
        let recomended = {
          name: "Artículos destacados",
        }
        response.push(recomended);
        this._articleService.medias = response;
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los medios"
        this._utilitiesService.loading = false;
      }
    );
  }

  getRecomendedArticles() {
    delete this.mediaSearchedArticles;
    this._articleService.getRecomendedArticles().subscribe(
      data => {
        let response = data as any;
        this._articleService.articles = response;
        this._articleService.articles = this._articleService.demoArticles.concat(this._articleService.articles);
        let dateString = this._articleService.articles[0].date;
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los artículos"
        this._utilitiesService.loading = false;
      }
    );
  }

  confirmReadPremium() {
    this._articleService.confirmReadPremium(this.selectedArticle).subscribe(
      data => {
        this._utilitiesService.loading = false;
        this._userService.user.premium_remain = this._userService.user.premium_remain - 1;
        this._userService.saveUser(this._userService.user);
        this.router.navigate(['/article', this.selectedArticle.id]);
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al comprar el artículo"
        this._utilitiesService.loading = false;
      }
    );
  }

  buyAccess() {
    this.router.navigate(['/paymentgateway']);
  }

  showArticle(article) {
    this.selectedArticle = article;
    if (this._userService.user) {
      if (article.premium) {
        $('#premiumModal').modal('show');
      } else {
        this.router.navigate(['/article', article.id]);
      }
    } else {
      $('#identifyModal').modal('show');
    }
  }

  getArticlesByMedia() {
    if (!this.selectedMedia.url) {
      this.getRecomendedArticles();
    } else {
      this._articleService.getArticlesByMedia(this.selectedMedia).subscribe(
        data => {
          let response = data as any;
          this._articleService.articles = response;
          this._utilitiesService.loading = false;
        },
        err => {
          this._utilitiesService.alertError = "Se ha producido un error al obtener los artículos"
          this._utilitiesService.loading = false;
        }
      );
      this.mediaSearchedArticles = this._utilitiesService.cloneObject(this.selectedMedia);
    }

  }




  ngOnInit(): void {
  }

}
