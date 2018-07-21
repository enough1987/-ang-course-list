import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from './user/user.model';
import { LocalStorageService } from '../core/services';

describe('AuthService', () => {
  // https://angular.io/guide/testing#angular-testbed
  let service: AuthService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LocalStorageService', {
      getItem: () => new User(123, 'jhon@doe.com', 'password', 'Jhon', 'Doe'),
      setItem: () => {},
      removeItem: () => {},
    });

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: LocalStorageService, useValue: spy }
      ]
    });

    service = TestBed.get(AuthService);
    localStorageServiceSpy = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be instance of AuthService', () => {
    expect(service).toEqual(jasmine.any(AuthService));
  });

  it('should retrieve user info', () => {
    service.getUserInfo();
    expect(service.getUserInfo()).toEqual(new User(123, 'jhon@doe.com', 'password', 'Jhon', 'Doe'));
  });

  it('should get user info from localStorage', () => {
    service.getUserInfo();
    expect(localStorageServiceSpy.getItem).toHaveBeenCalled();
  });

  it('should return null if user is not stored in localStorage', () => {
    localStorageServiceSpy.getItem.and.returnValue(null);
    service.getUserInfo();
    expect(service.getUserInfo()).toEqual(new User(123, 'jhon@doe.com', 'password', 'Jhon', 'Doe'));
  });

  it('should return undefined on session check if user data is not found', () => {
    localStorageServiceSpy.getItem.and.returnValue(null);
    expect(service.isUserAuthenticated()).toBeUndefined();
  });

  it('should set localStorage user and session on login', () => {
    service.login();
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledTimes(2);
  });

  it('should remove localStorage user and session on login', () => {
    service.logout();
    expect(localStorageServiceSpy.removeItem).toHaveBeenCalledTimes(2);
  });

});
