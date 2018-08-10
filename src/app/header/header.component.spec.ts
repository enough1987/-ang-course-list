import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { HeaderComponent } from './header.component';
import { AuthService } from '../shared/services';
import { UserPublicInfo } from '../shared/models';
import { RouterStub } from '../testing/router-stubs';
import { appRoutingPaths } from '../app.routing.paths';

class AuthServiceStub {
  public isAuthenticated: Observable<boolean> = of(true);
  public userInfo: Observable<UserPublicInfo> = of(new UserPublicInfo('john@doe.com', 'John', 'Doe'));
  logout = (): Observable<any> => of({ success: true });
}

describe('HeaderComponent', () => {
  let component;
  let service;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        HeaderComponent,
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(HeaderComponent);
    service = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout service method', () => {
    component.ngOnInit();
    spyOn(service, 'logout').and.callThrough();
    component.logout();
    expect(service.logout).toHaveBeenCalled();
  });

  it('should navigate to logout on successful server logout', () => {
    component.ngOnInit();
    spyOn(router, 'navigateByUrl').and.callThrough();
    component.logout();
    expect(router.navigateByUrl).toHaveBeenCalledWith(appRoutingPaths.login);
  });

  it('should no nothing on logout if server request returned an invalid response', () => {
    component.ngOnInit();
    spyOn(service, 'logout').and.returnValue(of({}));
    spyOn(router, 'navigateByUrl');
    component.logout();
    expect(router.navigateByUrl).not.toHaveBeenCalledWith(appRoutingPaths.login);
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
