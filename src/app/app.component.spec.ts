import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { of, Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';

describe('AppComponent', () => {
  let component;
  let authService;

  class AuthServiceStub {
    public isAuthenticated: Observable<boolean> = of(true);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        AppComponent,
        { provide: AuthService, useClass: AuthServiceStub }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(AppComponent);
    authService = TestBed.get(AuthService);
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

});
