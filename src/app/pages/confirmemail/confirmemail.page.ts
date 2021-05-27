import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'confirmemail-page',
  templateUrl: './confirmemail.page.html'
})
export class ConfirmemailPage implements OnInit {

  confirmMailMessageSuccess: string;
  confirmMailMessageDanger: string;

  constructor(public _userService: UserService,
    public route: ActivatedRoute, public _utilitiesService: UtilitiesService) {
    this.confirmMail();
  }

  confirmMail() {
    let uuid;
    this.route.params.subscribe(params => {
      uuid = params['id'];
    });
    let params = {
      uuid: uuid
    }
    this._userService.confirmEmail(params).subscribe(data => {
      if (data) {
        this.confirmMailMessageSuccess = 'Gracias por confirmar tu mail. Ahora ya puedes loguearte en Estupinia';
      } else {
        this.confirmMailMessageDanger = 'No existe el usuario'
      }
      this._utilitiesService.loading = false;
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

    });
  }

}
