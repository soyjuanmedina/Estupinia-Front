import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UtilitiesService } from '../../services/utilities.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'registe-page',
  templateUrl: './register.page.html'
})
export class RegisterPage implements OnInit {

  newUser: User = {
    email: "",
    password: ""
  };

  newUserForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
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

  register() {
    this._utilitiesService.clearAlerts();
    this._authService.register(this.newUserForm.value);
  }

  ngOnInit(): void {
  }

}
