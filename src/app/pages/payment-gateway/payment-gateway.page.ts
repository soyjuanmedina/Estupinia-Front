import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'payment-gateway-page',
  templateUrl: './payment-gateway.page.html',
  styleUrls: ['./payment-gateway.page.scss'],
})
export class PaymentGatewayPage implements OnInit {

  buyForm = new FormGroup({
    amount: new FormControl('', Validators.compose(
      [Validators.min(1), Validators.max(10)]))
  });

  constructor(public _utilitiesService: UtilitiesService, public _articleService: ArticleService, public _userService: UserService,) { }

  buyAccess(type) {
    this._articleService.buyAccess(type).subscribe(
      data => {
        this._utilitiesService.loading = false;
        this._userService.saveUser(data);
        this._utilitiesService.alertSuccess = "La compra se ha efectuado correctamente, ahora tiene acceso a "
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al realizar la compra"
        this._utilitiesService.loading = false;
      }
    );

  }



  buyPremiumAccess() {
    this._articleService.buyPremiumAccess(this.buyForm.value.amount).subscribe(
      data => {
        this._utilitiesService.loading = false;
        this._userService.user.premium_remain = this._userService.user.premium_remain + this.buyForm.value.amount;
        this._userService.saveUser(this._userService.user);
        this._utilitiesService.alertSuccess = "La compra se ha efectuado correctamente, ahora tiene acceso a "
      },
      err => {
        this._utilitiesService.alertError = "Se ha producido un error al realizar la compra"
        this._utilitiesService.loading = false;
      }
    );

  }

  ngOnInit(): void {
  }

}
