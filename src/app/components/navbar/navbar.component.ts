import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, public _userService: UserService) { }

  logout() {
  }

  openRegisterModal() {

  }
  openLoginModal() {

  }

  ngOnInit(): void {
  }

}
