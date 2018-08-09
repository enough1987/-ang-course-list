import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services';

import { Observable, of } from 'rxjs';

import { RouterStub } from '../../testing/router-stubs';
import { appRoutingPaths } from '../../app.routing.paths';

describe('AuthGuard', () => {
  class AuthServiceStub {
    public isAuthenticated: Observable<boolean> = of(true);
  }

  let guard: AuthGuard;
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
    });

    guard = TestBed.get(AuthGuard);
    service = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow loading if authenticated', () => {
    expect(guard.canLoad()).toBe(true);
  });

  it('should deny loading if not authenticated', () => {
    guard.isAuthenticated = false;
    expect(guard.canLoad()).toBe(false);
  });

  it('should navigate to login if not authenticated', () => {
    guard.isAuthenticated = false;
    spyOn(router, 'navigateByUrl');
    guard.canLoad();
    expect(router.navigateByUrl).toHaveBeenCalledWith(appRoutingPaths.login);
  });

});
