import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { User, UserPublicInfo } from './user/user.model';
import { Session } from './session/session.model';
import { LocalStorageService } from '../core/services/local-storage.service';
import { appRoutingPaths } from '../app.routing.paths';

@Injectable()
export class AuthService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(this.isUserAuthenticated());
  public userInfo: BehaviorSubject<UserPublicInfo> = new BehaviorSubject(this.getUserInfo());

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {}

  login() {
    const user = new User(123, 'john@doe.com', 'password', 'John', 'Doe');
    const session = new Session(user.id, '123456qwerty');

    this.localStorageService.setItem('user', user);
    this.localStorageService.setItem('session', session);

    this.isAuthenticated.next(true);
    this.userInfo.next(user);

    this.router.navigateByUrl(`/${appRoutingPaths.courses}`);
  }

  logout() {
    this.localStorageService.removeItem('user');
    this.localStorageService.removeItem('session');

    this.isAuthenticated.next(false);
    this.userInfo.next(null);

    this.router.navigateByUrl(`/${appRoutingPaths.login}`);
  }

  isUserAuthenticated(): boolean {
    const user = this.localStorageService.getItem('user');
    if (user && user.id) {
      const session = this.localStorageService.getItem('session');
      return !!(session && session.userId === user.id);
    }
  }

  getUserInfo(): UserPublicInfo {
    const storedUser = this.localStorageService.getItem('user');
    if (storedUser) {
      const { email, firstName, lastName } = storedUser;
      return new UserPublicInfo(email, firstName, lastName);
    }
    return null;
  }
}
