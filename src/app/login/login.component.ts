import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { appRoutingPaths } from '../app.routing.paths';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnDestroy {
  public email: string;
  public password: string;

  private sub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.sub = this.authService.login(this.email, this.password).subscribe(res => {
      if (res.auth) {
        this.router.navigateByUrl(appRoutingPaths.courses);
      }
    });
  }
}
