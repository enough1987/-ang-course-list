import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { AuthService } from './auth.service';
import { UserPublicInfo } from '../models/user.model';
import { LocalStorageService } from '../../core/services';
import { ConfigService } from '../../core/services';

describe('AuthService', () => {
  // https://angular.io/guide/testing#angular-testbed
  // https://angular.io/guide/http#testing-http-requests
  let httpTestingController: HttpTestingController;

  let service: AuthService;
  let localStorage: jasmine.SpyObj<LocalStorageService>;
  let config: any;

  const configStub = {
    apiBaseUrl: 'http://base.url/api',
    apiEndpoints: {
      login: 'LOGIN',
      logout: 'LOGOUT',
      user: 'USER',
    }
  };

  const localStorageStub = {
    setItem: () => {},
    removeItem: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: LocalStorageService, useValue: localStorageStub },
        { provide: ConfigService, useValue: configStub },
      ],
    });

    service = TestBed.get(AuthService);
    localStorage = TestBed.get(LocalStorageService);
    config = TestBed.get(ConfigService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be instance of AuthService', () => {
    expect(service).toEqual(jasmine.any(AuthService));
  });

  it('should retrieve user info', () => {
    const data = new UserPublicInfo('john@doe.com', 'John', 'Doe');

    service.getUserInfo().subscribe(res => expect(res).toBe(data));

    const req = httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.user}`);
    expect(req.request.method).toEqual('GET');
    req.flush(data);
  });

  it('should get user info from localStorage', () => {
    const data = new UserPublicInfo('john@doe.com', 'John', 'Doe');
    spyOn(service.userInfo, 'next');

    service.getUserInfo().subscribe(() =>
      expect(service.userInfo.next).toHaveBeenCalledWith(data));

    httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.user}`).flush(data);
  });

  it('should set localStorage token on login', () => {
    const data = { auth: true, token: '123456qwerty' };
    spyOn(localStorage, 'setItem');
    spyOn(service, 'getUserInfo').and.returnValue(of(null));  // otherwise .subscribe will fail and retry() will fire

    service.login('user', 'pass').subscribe(() =>
      expect(localStorage.setItem).toHaveBeenCalledWith('token', '123456qwerty'));

    httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.login}`).flush(data);
  });

  it('should remove localStorage user and session on logout', () => {
    const data = { success: true };
    spyOn(localStorage, 'removeItem');

    service.logout().subscribe(() =>
      expect(localStorage.removeItem).toHaveBeenCalledWith('token'));

    httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.logout}`).flush(data);
  });

  it('should reset isAuthenticated on logout', () => {
    const data = { success: true };
    spyOn(service.isAuthenticated, 'next');

    service.logout().subscribe(() =>
      expect(service.isAuthenticated.next).toHaveBeenCalledWith(false));

    httpTestingController.expectOne(`${config.apiBaseUrl}/${config.apiEndpoints.logout}`).flush(data);
  });

});
