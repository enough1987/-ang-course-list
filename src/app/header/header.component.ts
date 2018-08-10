import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services';
import { UserPublicInfo } from '../shared/models';
import { appRoutingPaths  } from '../app.routing.paths';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  user: UserPublicInfo;

  private sub: Subscription;

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.sub = new Subscription();
    this.sub.add(this.authService.isAuthenticated.subscribe(next => this.isAuthenticated = next));
    this.sub.add(this.authService.userInfo.subscribe(next => this.user = next));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    this.sub.add(this.authService.logout().subscribe(res => {
      if (res.success) {
        this.router.navigateByUrl(appRoutingPaths.login);
      }
    }));
  }

}
