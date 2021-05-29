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

  selectedUser: Article;
  selectedSchedule: string;
  selectedTheme: string;
  isVisible = $('#searchingAccordion').is(":visible");

  constructor(public _userService: UserService,
    public _utilitiesService: UtilitiesService, public router: Router) {
    this._utilitiesService.clearAlerts();
    // Wake Up Heroku
    this._userService.getDBMedias();
    if (!this._userService.users) {
      this.getRecomendedUsers();
    }
    if (!this._userService.schedules) {
      this.getSchedules();
    }
    if (!this._userService.themes) {
      this.getThemes();
    }
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }

  getSchedules() {
    this._userService.getSchedules().subscribe(
      data => {
        let response = data as any;
        this._userService.schedules = response;
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los horarios"
        this._utilitiesService.loading = false;
      }
    );
  }

  getThemes() {
    this._userService.getThemes().subscribe(
      data => {
        let response = data as any;
        this._userService.themes = response;
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los temas"
        this._utilitiesService.loading = false;
      }
    );
  }


  getRecomendedUsers() {
    this._userService.getRecomendedUsers().subscribe(
      data => {
        let response = data as any;
        this._userService.users = response;
        this._userService.allUsers = this._utilitiesService.cloneObject(this._userService.users);
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al obtener los artículos"
        this._utilitiesService.loading = false;
      }
    );
  }


  buyAccess() {
    this.router.navigate(['/paymentgateway']);
  }

  showUser(user) {
    this.selectedUser = user;
    if (this._userService.user.buyedArticles && this._userService.user.buyedArticles.includes(this.selectedUser.id)) {
      this.router.navigate(['/user', this.selectedUser.id]);
    } else {
      $('#premiumModal').modal('show');
    }
  }

  getUsersByschedule() {
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
    this._userService.users = this._userService.allUsers.filter(user => user.schedule.includes(this.selectedSchedule));
  }

  getUsersByTheme() {
    this._userService.users = this._userService.allUsers.filter(user => user.themes.includes(this.selectedTheme));
    // this._articleService.articles = this._articleService.allArticles.filter(article => article.author == this.selectedTheme);
  }


  clearFilters() {
    delete this.selectedTheme;
    delete this.selectedSchedule;
    this._userService.users = this._userService.allUsers;
  }




  ngOnInit(): void {
  }

}
