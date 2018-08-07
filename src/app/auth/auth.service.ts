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
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userInfo: BehaviorSubject<UserPublicInfo> = new BehaviorSubject(new UserPublicInfo('', '', ''));

  constructor(
    @Inject(ConfigService) private config,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.login}`, { email, password })
      .pipe(
        tap((res: any) => {
          if (res.auth && res.token) {
            this.localStorageService.setItem('token', res.token);

            this.isAuthenticated.next(true);
            this.getUserInfo().subscribe((resUser: any) => this.userInfo.next(resUser.user));
          }
        }),
        retry(1),
        catchError(err => throwError(err)),
      );
  }

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
  }

  // isUserAuthenticated(): boolean {
  //   const user = this.localStorageService.getItem('user');
  //   if (user && user.id) {
  //     const session = this.localStorageService.getItem('session');
  //     return !!(session && session.userId === user.id);
  //   }
  // }

  getUserInfo(): Observable<UserPublicInfo> {
    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.user}`)
      .pipe(
        tap((res: any) => {
          if (res.user) {
            this.userInfo.next(res.user);
          }
        }),
        retry(1),
        catchError(err => throwError(err)),
      );
  }
}
