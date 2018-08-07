import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { User, UserPublicInfo } from './user/user.model';
import { Session } from './session/session.model';

import { ConfigService, LocalStorageService } from '../core/services';

@Injectable()
export class AuthService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(this.isUserAuthenticated());
  public userInfo: BehaviorSubject<UserPublicInfo> = new BehaviorSubject(this.getUserInfo());

  constructor(
    @Inject(ConfigService) private config,
    private localStorageService: LocalStorageService,
    private router: Router,
    private http: HttpClient,
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.login}`, { email, password })
      .pipe(
        tap((res: any) => {
          if (res.auth && res.token) {
            this.localStorageService.setItem('token', res.token);

            this.isAuthenticated.next(true);
            // this.getUserInfo();
          }
        }),
        retry(1),
        catchError(err => throwError(err)),
      );
  }

  // login() {
  //   const user = new User(123, 'jhon@doe.com', 'password', 'Jhon', 'Doe');
  //   const session = new Session(user.id, '123456qwerty');

  //   this.localStorageService.setItem('user', user);
  //   this.localStorageService.setItem('session', session);

  //   this.isAuthenticated.next(true);
  //   this.userInfo.next(user);

  //   this.router.navigateByUrl(appRoutingPaths.courses);
  // }

  logout(): Observable<any> {
    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.logout}`)
      .pipe(
        tap((res: any) => {
          if (res.success) {
            this.localStorageService.removeItem('token');
            this.isAuthenticated.next(false);
          }
        }),
        retry(1),
        catchError(err => throwError(err)),
      );

    // this.router.navigateByUrl(appRoutingPaths.login);
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
