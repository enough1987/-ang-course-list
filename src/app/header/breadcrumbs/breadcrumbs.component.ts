import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadCrumbs: string[];

  private sub: Subscription;

  constructor(public router: Router) {}

  ngOnInit() {
    this.sub = this.router.events.subscribe(event => this.setBreadCrumbs(event));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  setBreadCrumbs(routerEvent) {
    if (routerEvent instanceof ActivationEnd) {
      const routeBreadCrumbsFactory = snapshot => {
        console.log(snapshot.url);
        switch (snapshot.url[0].path) {
          case 'courses':
            return () => this.getCoursesBreadCrumbs(snapshot);
          default:
            return () => ['Bread', 'Crumbs'];
        }
      };

      console.log(routerEvent);
      this.breadCrumbs = routeBreadCrumbsFactory(routerEvent.snapshot)();
    }
  }

  getCoursesBreadCrumbs(snapshot) {
    if (snapshot.url.length === 1) {
      return ['Courses'];
    }
    if (snapshot.url[1].path === 'add') {
      return ['Courses', 'New'];
    }
    if (snapshot.params.id) {
      return ['Courses', `COURE_NAME_HERE_[ID: ${snapshot.params.id}]`];
    }
  }
}
