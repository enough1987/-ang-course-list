import { SessionInterface } from './session.interface';

export class Session implements SessionInterface {
  constructor(
    public userId: number,
    public token: string,
  ) {}
}
