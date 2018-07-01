import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { User } from './user/user.model';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be instance of AuthService', inject([AuthService], (service: AuthService) => {
    expect(service).toEqual(jasmine.any(AuthService));
  }));

  it('should return dummy user', inject([AuthService], (service: AuthService) => {
    expect(service.getUser()).toEqual(new User(123, 'John', 'Doe'));
  }));
});
