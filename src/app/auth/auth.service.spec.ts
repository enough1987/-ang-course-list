import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from './user/user.model';
import { LocalStorageService } from '../core/services';

describe('AuthService', () => {
  // https://angular.io/guide/testing#angular-testbed
  let service: AuthService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
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

  it('should return dummy user', () => {
    expect(service.getUserInfo()).toEqual(new User(123, 'John', 'Doe'));
  });
});
