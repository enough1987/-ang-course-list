import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  route = 'courses';

  private sub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.sub = this.authService.isAuthenticated.subscribe(next => this.isAuthenticated = next);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setRoute(route) {
    this.route = route;
  }
}
