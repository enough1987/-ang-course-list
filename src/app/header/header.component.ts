import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  isAuthenticated: boolean;
  user: User;

  constructor(private authService: AuthService) {
    // this.authService.login();
    this.authService.logout();

    this.isAuthenticated = authService.isAuthenticated();
    console.log('isAuthenticated', this.isAuthenticated);
    this.user = authService.getUserInfo();
  }
}
