import { User, UserPublicInfo } from './user.model';

describe('UserModel', () => {
  describe('User model', () => {
    it('should instantiate successfully', () => {
      const user = new User(
        42,
        'jhon@doe.com',
        'password',
        'Jhon',
        'Doe',
      );

      expect({ ...user }).toEqual({
        id: 42,
        email: 'jhon@doe.com',
        password: 'password',
        firstName: 'Jhon',
        lastName: 'Doe',
      });
    });

    describe('UserPublicInfo model', () => {
      it('should instantiate successfully', () => {
        const user = new UserPublicInfo(
          'jhon@doe.com',
          'Jhon',
          'Doe',
        );

        expect({ ...user }).toEqual({
          email: 'jhon@doe.com',
          firstName: 'Jhon',
          lastName: 'Doe',
        });
      });
    });
  });
});
