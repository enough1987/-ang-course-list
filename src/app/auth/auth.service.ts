import { Injectable } from '@angular/core';
import { AuthModule } from './auth.module';
import { User } from './user/user.model';
import { LocalStorageService } from '../core/services/local-storage.service';

@Injectable({
  providedIn: AuthModule
})
export class AuthService {
  constructor(private localStorageService: LocalStorageService) {}

  login() {
    this.localStorageService.setItem('user', new User(123, 'John', 'Doe'));
  }

  logout() {
    this.localStorageService.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.localStorageService.getItem('user');
  }

  getUserInfo(): User {
    return this.localStorageService.getItem('user');
  }
}
