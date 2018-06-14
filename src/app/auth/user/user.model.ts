import { UserInterface } from './user.interface';

export class User implements UserInterface {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
  ) {}
}
