import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  routeSpecificClass: string;

  private sub: Subscription;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.sub = new Subscription();
    this.sub.add(this.authService.isAuthenticated.subscribe(next => this.isAuthenticated = next));
    this.sub.add(this.router.events.subscribe(event => this.setRouteSpecificClasses(event)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setRouteSpecificClasses(routerEvent) {
    if (routerEvent instanceof NavigationEnd) {
      const routeClassMap = {
        '/login': 'app__main_center',
      };

      console.log('url', routerEvent.url, 'setting class to', routeClassMap[routerEvent.url]);

      this.routeSpecificClass = routeClassMap[routerEvent.url];
    }
  }
}
