import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  public email: string;
  public password: string;

  constructor(private authService: AuthService) {}

  onSubmit(e: Event) {
    e.preventDefault();
    this.authService.login();
  }
}
