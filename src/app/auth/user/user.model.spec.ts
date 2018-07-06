import { User } from './user.model';

describe('UserModel', () => {
  it('should instantiate successfully', () => {
    const user = new User(
      42,
      'John',
      'Doe'
    );

    expect({ ...user }).toEqual({
      id: 42,
      firstName: 'John',
      lastName: 'Doe',
    });
  });
});
