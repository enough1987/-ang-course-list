import { Injectable } from '@angular/core';
import { AuthModule } from './auth.module';
import { User } from './user/user.model';

@Injectable({
  providedIn: AuthModule
})
export class AuthService {

  constructor() { }

  getUser() {
    return new User(123, 'John', 'Doe');
  }
}
