import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HeaderComponent } from './header.component';
import { AuthService } from '../auth/auth.service';
import { UserPublicInfo } from '../auth/user/user.model';

class AuthServiceStub {
  public isAuthenticated: Observable<boolean> = of(true);
  public userInfo: Observable<UserPublicInfo> = of(new UserPublicInfo('john@doe.com', 'John', 'Doe'));
  logout = jasmine.createSpy('logout', () => {});
}

describe('HeaderComponent', () => {
  let component;
  let service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        HeaderComponent,
        { provide: AuthService, useClass: AuthServiceStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(HeaderComponent);
    service = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout service method', () => {
    component.logout();
    expect(service.logout).toHaveBeenCalled();
  });

  it('should subscribe on init', () => {
    expect(component.sub).toBeFalsy();
    component.ngOnInit();
    expect(component.sub).toBeTruthy();
  });

  it('should unsubscribe on destroy', () => {
    component.sub = jasmine.createSpyObj({
      unsubscribe: null,
    });

    component.ngOnDestroy();

    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });
});
