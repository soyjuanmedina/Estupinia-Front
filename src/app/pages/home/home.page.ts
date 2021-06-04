import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from '../../interfaces/article';
import { Media } from '../../interfaces/media';
import { Schedule } from '../../interfaces/schedule';
import { ScheduleDay } from '../../interfaces/scheduleDay';
import { Theme } from '../../interfaces/theme';
import { ArticleService } from '../../services/article.service';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';
import { WebSocketService } from '../../services/webSocket.service';
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
  selectedWeekDay: string;
  selectedTheme: Theme;
  searchedTheme: Theme;
  isVisible = $('#searchingAccordion').is(":visible");

  greeting: any;
  name: string;

  constructor(public _userService: UserService,
    public _utilitiesService: UtilitiesService, public router: Router, public _webSocketService: WebSocketService) {
    this._utilitiesService.clearAlerts();
    if (this._userService.user) {
      this._webSocketService._connect();
      this._userService.getConectedUsers();
    }
    // Wake Up Heroku
    this._userService.getDBMedias();
    if (!this._userService.themes) {
      this._userService.getThemes();
    }
  }

  connect() {
    this._webSocketService._connect();
  }

  disconnect() {
    this._webSocketService._disconnect();
  }

  sendMessage() {
    this._webSocketService._send(this.name);
  }

  handleMessage(message) {
    this.greeting = message;
  }

  getConnected() {
    this._webSocketService.getConnected();
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }

  /*   getSchedules() {
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
    } */

  /*   getThemes() {
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
    } */

  getUsersToDate(theme) {
    this._userService.getUsersToDate(theme);
  }


  buyAccess() {
    this.router.navigate(['/paymentgateway']);
  }

  comunicateToUser(user) {
    if (this._userService.user) {
      this.router.navigate(['/usertocomunicate', user.id]);
    } else {
      $('#identifyModal').modal('show');
    }
  }

  getUsersByTheme(theme) {
    this.getUsersToDate(theme);
    this.filterConectedUsersByTheme(theme);
  }
  /* 
    filterUsersByschedule() {
      this._userService.users = this._userService.allUsers.filter(user => user.schedule.days.some(day => day.day == this.selectedWeekDay));
    } */

  filterConectedUsersByTheme(theme) {
    this._userService.conectedUsers = [];
    if (this._userService.allConectedUsers) {
      this._userService.allConectedUsers.forEach((user) => {
        user.themes.forEach((userTheme) => {
          if (userTheme.id == theme.id) {
            this._userService.conectedUsers.push(user);
          }

        })
      })

      this._userService.allConectedUsers.filter(user => {
        user.themes.some(conectedUsertheme => {
          conectedUsertheme.id == theme.id
        })
      });
    }
  }


  clearFilters() {
    delete this.selectedTheme;
    delete this.selectedWeekDay;
    this._userService.conectedUsers = this._userService.allUsers;
  }

  ngOnInit(): void {
  }

}
