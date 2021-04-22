import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StreamingService } from '../../interfaces/streamingService';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {


  editedUser;

  ProfileForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.required]),
    confirmPassword: new FormControl('', [
      Validators.required])
  }, { validators: this.checkPasswords });


  constructor(public _movieService: MovieService, public _authService: AuthService,
    public _utilitiesService: UtilitiesService, public _userService: UserService) {
    this.editedUser = Object.assign({}, this._userService.user);
    this.editedUser.confirmPassword = '';

  }

  updateProfile() {
    console.log('updateProfile()');
    console.log('this.ProfileForm', this.ProfileForm.controls.email.markAsDirty);
  }

  addStreamingService(streamingServices) {
    if (this.editedUser.streamingServices.filter(e => e.id === streamingServices.id).length == 0) {
      this.editedUser.streamingServices.push(streamingServices)
    }
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
