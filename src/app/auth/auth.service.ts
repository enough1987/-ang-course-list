import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { UserPublicInfo } from './user/user.model';

import { ConfigService, LocalStorageService } from '../core/services';

@Injectable()
export class AuthService {
  public isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userInfo: BehaviorSubject<UserPublicInfo> = new BehaviorSubject(null);

  constructor(
    @Inject(ConfigService) private config,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.login}`, { email, password })
      .pipe(
        tap((res: any) => {
          if (res.auth && res.token) {
            this.localStorageService.setItem('token', res.token);

            this.isAuthenticated.next(true);
            this.getUserInfo().subscribe();
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

  getUserInfo(): Observable<UserPublicInfo> {
    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.user}`)
      .pipe(
        tap((res: any) => {
          const { email, firstName, lastName } = res;
          this.userInfo.next(new UserPublicInfo(email, firstName, lastName)  );
        }),
        retry(1),
        catchError(err => throwError(err)),
      );
  }
}
