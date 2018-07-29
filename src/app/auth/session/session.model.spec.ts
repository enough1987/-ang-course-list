import { Session } from './session.model';

describe('SessionModel', () => {
  it('should instantiate successfully', () => {
    const session = new Session(
      42,
      'token12346'
    );

    expect({ ...session }).toEqual({
      userId: 42,
      token: 'token12346',
    });
  });

});
