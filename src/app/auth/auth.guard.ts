import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
  isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    authService.isAuthenticated.subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
    });
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    return this.isAuthenticated;
  }
}
