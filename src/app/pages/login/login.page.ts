import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  user: User;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required])
  });

  constructor(public _authService: AuthService,
    public _utilitiesService: UtilitiesService) {
    this._utilitiesService.clearAlerts();
  }

  login() {
    this._authService.login(this.loginForm.value);
  }

  ngOnInit(): void {
  }

}
