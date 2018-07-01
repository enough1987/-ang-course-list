import { AuthService } from './auth.service';
import { User } from './user/user.model';

describe('AuthService', () => {
  // Testing a service without TestBed + inject
  // https://angular.io/guide/testing#service-tests
  let service: AuthService;
  beforeEach(() => {
    service = new AuthService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be instance of AuthService', () => {
    expect(service).toEqual(jasmine.any(AuthService));
  });

  it('should return dummy user', () => {
    expect(service.getUser()).toEqual(new User(123, 'John', 'Doe'));
  });
});
