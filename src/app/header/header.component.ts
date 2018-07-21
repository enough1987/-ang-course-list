import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserPublicInfo } from '../auth/user/user.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  user: UserPublicInfo;

  private sub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.sub = new Subscription();
    this.sub.add(this.authService.isAuthenticated.subscribe(next => this.isAuthenticated = next));
    this.sub.add(this.authService.userInfo.subscribe(next => {
      console.log('next userInfo', next)
      this.user = next;
    }));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
