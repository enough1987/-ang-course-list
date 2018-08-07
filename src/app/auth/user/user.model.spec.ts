import { User, UserPublicInfo } from './user.model';

describe('UserModel', () => {
  describe('User model', () => {
    it('should instantiate successfully', () => {
      const user = new User(
        42,
        'john@doe.com',
        'password',
        'John',
        'Doe',
      );

      expect({ ...user }).toEqual({
        id: 42,
        email: 'john@doe.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
      });
    });

    describe('UserPublicInfo model', () => {
      it('should instantiate successfully', () => {
        const user = new UserPublicInfo(
          'john@doe.com',
          'John',
          'Doe',
        );

        expect({ ...user }).toEqual({
          email: 'john@doe.com',
          firstName: 'John',
          lastName: 'Doe',
        });
      });
    });
  });
});
