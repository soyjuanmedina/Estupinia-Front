import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  user: User;

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required])
  });

  constructor(public _authService: AuthService, public _userService: UserService,
    public _utilitiesService: UtilitiesService, public router: Router) {
    this._utilitiesService.clearAlerts();
  }

  login() {
    //this._authService.login(this.loginForm.value);
    this._utilitiesService.loading = true;
    this._authService.login(this.loginForm.value).subscribe(
      data => {
        let response = data as any;
        delete this._utilitiesService.alertError;
        this._userService.saveToken(response.accessToken);
        this._userService.getUser();
        this._userService.getConectedUsers();
        this._utilitiesService.loading = false;
      },
      err => {
        console.log('err', err)
        this._utilitiesService.alertError = "Error de autenticación";
        this._utilitiesService.loading = false;
      }
    );
  }

  ngOnInit(): void {
  }

}
