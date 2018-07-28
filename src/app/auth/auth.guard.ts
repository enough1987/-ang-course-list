import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
  isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.isAuthenticated.subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
    });
  }

  canLoad(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    return this.isAuthenticated;
  }
}
