import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { of, Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';

import { RouterStub } from './testing/router-stubs';

describe('AppComponent', () => {
  let component;
  let authService: AuthService;
  let router: Router;

  class AuthServiceStub {
    public isAuthenticated: Observable<boolean> = of(true);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AppComponent,
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(AppComponent);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set subscription on init', () => {
    component.ngOnInit();

    expect(component.isAuthenticated).toBe(true);
  });

  it('should unsubscribe on destroy', () => {
    component.sub = jasmine.createSpyObj({
      unsubscribe: null,
    });

    component.ngOnDestroy();
    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });

  it('should subscribe to authentication status on init', () => {
    spyOn(authService.isAuthenticated, 'subscribe');
    expect(authService.isAuthenticated.subscribe).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(authService.isAuthenticated.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
  });

  it('should subscribe to future router events on init', () => {
    spyOn(router.events, 'subscribe');
    expect(router.events.subscribe).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(router.events.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
  });

  it('should react to future router events', () => {
    component.ngOnInit();

    router.navigateByUrl('/login');
    expect(component.routeSpecificClass).toBe('app__main_center');
  });

  it('should ignore router events other than navigation end', () => {
    const ns = new NavigationStart(1, '/courses');
    component.setRouteSpecificClasses(ns);
    expect(component.routeSpecificClass).toBeUndefined();
  });

});
