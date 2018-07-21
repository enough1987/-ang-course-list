import { Injectable } from '@angular/core';
import { User, UserPublicInfo } from './user/user.model';
import { Session } from './session/session.model';
import { LocalStorageService } from '../core/services/local-storage.service';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(this.isUserAuthenticated());
  public userInfo: BehaviorSubject<UserPublicInfo> = new BehaviorSubject(this.getUserInfo());

  constructor(private localStorageService: LocalStorageService) {}

  login() {
    const user = new User(123, 'john@doe.com', 'password', 'John', 'Doe');
    const session = new Session(user.id, '123456qwerty');

    this.localStorageService.setItem('user', user);
    this.localStorageService.setItem('session', session);

    this.isAuthenticated.next(true);
    this.userInfo.next(user);
  }

  logout() {
    this.localStorageService.removeItem('user');
    this.localStorageService.removeItem('session');

    this.isAuthenticated.next(false);
    this.userInfo.next(null);
  }

  isUserAuthenticated(): boolean {
    const user = this.localStorageService.getItem('user');
    if (user && user.name) {
      const session = this.localStorageService.getItem('session');
      return !!(session && session[user.name]);
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
