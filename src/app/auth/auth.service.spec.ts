import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User, UserPublicInfo } from './user/user.model';
import { LocalStorageService } from '../core/services';

import { RouterStub } from '../testing/router-stubs';
import { appRoutingPaths } from '../app.routing.paths';

describe('AuthService', () => {
  // https://angular.io/guide/testing#angular-testbed
  let service: AuthService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let router: Router;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocalStorageService', {
      getItem: new User(123, 'jhon@doe.com', 'password', 'Jhon', 'Doe'),
      setItem: null,
      removeItem: null,
    });

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: LocalStorageService, useValue: spy },
        { provide: Router, useClass: RouterStub },
      ],
    });

    service = TestBed.get(AuthService);
    localStorageServiceSpy = TestBed.get(LocalStorageService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be instance of AuthService', () => {
    expect(service).toEqual(jasmine.any(AuthService));
  });

  it('should retrieve user info', () => {
    expect(service.getUserInfo()).toEqual(new UserPublicInfo('jhon@doe.com', 'Jhon', 'Doe'));
  });

  it('should get user info from localStorage', () => {
    service.getUserInfo();
    expect(localStorageServiceSpy.getItem).toHaveBeenCalled();
  });

  it('should return null if user is not stored in localStorage', () => {
    localStorageServiceSpy.getItem.and.returnValue(null);
    expect(service.getUserInfo()).toBeNull();
  });

  it('should return undefined on session check if user data is not found', () => {
    localStorageServiceSpy.getItem.and.returnValue(null);
    expect(service.isUserAuthenticated()).toBeUndefined();
  });

  it('should set localStorage user and session on login', () => {
    service.login();
    expect(localStorageServiceSpy.setItem).toHaveBeenCalledTimes(2);
  });

  it('should remove localStorage user and session on login', () => {
    service.logout();
    expect(localStorageServiceSpy.removeItem).toHaveBeenCalledTimes(2);
  });

  it('should to courses on login', () => {
    spyOn(router, 'navigateByUrl');
    service.login();
    expect(router.navigateByUrl).toHaveBeenCalledWith(appRoutingPaths.courses);
  });

});
