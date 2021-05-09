import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
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
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('aliasesAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('50ms', [
          animate('250ms ease-in', keyframes([
            style({ opacity: 0, transform: 'translateX(-20%)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateX(5%)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
          ]))
        ]), { optional: true }),
        query(':leave', stagger('50ms', [
          animate('250ms ease-in', keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateX(5%)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateX(-20%)', offset: 1.0 })
          ]))
        ]), { optional: true })
      ])
    ])
  ]
})
export class HomePage implements OnInit {

  selectedArticle: Article;
  selectedMedia: string;
  selectedAuthor: string;
  selectedTag: string;
  isVisible = $('#searchingAccordion').is(":visible");

  constructor(public _articleService: ArticleService, public _userService: UserService,
    public _utilitiesService: UtilitiesService, public router: Router) {
    this._utilitiesService.clearAlerts();
    // Wake Up Heroku
    this._articleService.getDBMedias();
    if (!this._articleService.articles) {
      this.getRecomendedArticles();
    }
    if (!this._articleService.medias) {
      this.getMedias();
    }
    if (!this._articleService.authors) {
      this.getAuthors();
    }
    if (!this._articleService.tags) {
      this.getTags();
    }
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }

  getMedias() {
    this._articleService.getMedias().subscribe(
      data => {
        let response = data as any;
        this._articleService.medias = response;
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los medios"
        this._utilitiesService.loading = false;
      }
    );
  }

  getAuthors() {
    this._articleService.getAuthors().subscribe(
      data => {
        let response = data as any;
        this._articleService.authors = response;
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los autores"
        this._utilitiesService.loading = false;
      }
    );
  }

  getTags() {
    this._articleService.getTags().subscribe(
      data => {
        let response = data as any;
        this._articleService.tags = response;
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener las tags"
        this._utilitiesService.loading = false;
      }
    );
  }

  getRecomendedArticles() {
    this._articleService.getRecomendedArticles().subscribe(
      data => {
        let response = data as any;
        this._articleService.articles = response;
        this._articleService.allArticles = this._utilitiesService.cloneObject(this._articleService.articles);
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
        this._userService.saveUser(data);
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
    if (this._userService.user.buyedArticles && this._userService.user.buyedArticles.includes(this.selectedArticle.id)) {
      this.router.navigate(['/article', this.selectedArticle.id]);
    } else {
      $('#premiumModal').modal('show');
    }
  }

  getArticlesByMedia() {
    /* if (!this.selectedMedia.url) {
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
    } */
    this._articleService.articles = this._articleService.allArticles.filter(article => article.media == this.selectedMedia);
  }

  getArticlesByAuthor() {
    this._articleService.articles = this._articleService.allArticles.filter(article => article.author == this.selectedAuthor);
  }

  getArticlesByTag() {
    console.log(this.selectedTag);
    this._articleService.articles = this._articleService.allArticles.filter(article => article.tags.includes(this.selectedTag));
  }

  clearFilters() {
    console.log("clearFilters")
    delete this.selectedMedia;
    delete this.selectedAuthor;
    delete this.selectedTag;
    this._articleService.articles = this._articleService.allArticles;
  }




  ngOnInit(): void {
  }

}
