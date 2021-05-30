import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {


  editedUser;

  profileForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    themes: new FormArray([]),
    password: new FormControl('', [
      Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required])
  }, { validators: this.checkPasswords });


  constructor(public _authService: AuthService,
    public _utilitiesService: UtilitiesService, public _userService: UserService) {
    this.editedUser = this._utilitiesService.cloneObject(this._userService.user);
    this.editedUser.confirmPassword = '';
    if (!this._userService.themes) {
      this._userService.getThemes();
    }

  }

  updateProfile() {
    this._userService.updateUser(this.editedUser);
  }

  isThemeInUserThemes(theme) {
    return this.editedUser.themes.some(editedUserThemes => theme.id === editedUserThemes.id)
  }

  addUserTheme(theme) {
    this.profileForm.markAsDirty();
    if (this.isThemeInUserThemes(theme)) {
      this.editedUser.themes = this.editedUser.themes.filter(editedUserTheme => editedUserTheme.id != theme.id)
    } else {
      this.editedUser.themes.push(theme);
    };
  }

  removeStreamingServices(streamingServices) {
    this.editedUser.streamingServices = this.editedUser.streamingServices.filter(function (value, index, arr) {
      return value != streamingServices;
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }

  ngOnInit(): void {
  }

}
