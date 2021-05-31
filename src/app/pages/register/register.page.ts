import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UtilitiesService } from '../../services/utilities.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'registe-page',
  templateUrl: './register.page.html'
})
export class RegisterPage implements OnInit {

  newUser: User = {
    email: "",
    password: "",
    themes: []
  };

  newUserForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required]),
    themes: new FormArray([])
  });

  constructor(public _authService: AuthService, public _userService: UserService,
    public _utilitiesService: UtilitiesService) {
    this._utilitiesService.clearAlerts();
    if (!this._userService.themes) {
      this._userService.getThemes();
    }
  }

  addUserTheme(theme) {
    if (this.newUserForm.value.themes.includes(theme)) {
      this.newUserForm.value.themes = this.newUserForm.value.themes.filter(newUserFormTheme => newUserFormTheme.id != theme.id)
    } else {
      this.newUserForm.value.themes.push(theme);
    };
  }

  register() {
    this._utilitiesService.clearAlerts();
    this._utilitiesService.loading = true;
    this._authService.register(this.newUserForm.value).subscribe(
      data => {
        this._utilitiesService.alertSuccess = "Gracias por registrate en Estupinia. Hemos enviado un correo a tu dirección de mail. Por favor, confírmalo antes de loguearte"
        this._utilitiesService.loading = false;
      },
      err => {
        this._utilitiesService.alertError = err.error.message || "Se ha producido un error al procesar el registro. Prueba a hacerlo en unos minutos"
        this._utilitiesService.loading = false;
      }
    );
  }

  removeThemeFromUser(theme) {
    console.log('removeThemeFromUser', theme);
  }

  assignThemeToUser(theme) {
    console.log('assignThemeToUser', theme);
  }

  areInArray(item, array) {
    if (array && item) {
      return array.some(arrayItem => arrayItem.id == item.id);
    }
  }

  ngOnInit(): void {
  }

}
