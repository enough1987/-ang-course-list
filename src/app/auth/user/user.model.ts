import { UserInterface } from './user.interface';

export class UserPublicInfo implements Partial<UserInterface> {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
  ) {}
}

export class User extends UserPublicInfo implements UserInterface {
  public id: number;
  public password: string;

  constructor(id, email, password, firstName, lastName, ) {
    super(email, firstName, lastName);
    this.id = id;
    this.password = password;
  }
}
