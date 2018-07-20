import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  user: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getAuth();
  }

  getAuth() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.user = this.authService.getUserInfo();
  }

  login() {
    this.authService.login();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = this.authService.isAuthenticated();
  }

}
