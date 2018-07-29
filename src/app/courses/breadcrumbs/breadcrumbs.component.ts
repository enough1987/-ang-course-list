import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';

import { Subscription } from 'rxjs';

import { CoursesService } from '../courses.service';

type breadCrumbsType = { text: string, path?: string }[];

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadCrumbs: breadCrumbsType;

  private sub: Subscription;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initBreadCrumbs(this.router.url);
    this.sub = this.router.events.subscribe(event => this.updateBreadCrumbs(event));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initBreadCrumbs(url) {
    this.breadCrumbs = this.routeBreadCrumbsFactory(url)();
  }

  updateBreadCrumbs(routerEvent) {
    if (routerEvent instanceof NavigationEnd) {
      this.breadCrumbs = this.routeBreadCrumbsFactory(routerEvent.urlAfterRedirects)();
    }
  }

  routeBreadCrumbsFactory(url = '') {
    const urlArr = url.split('/').slice(1);
    switch (urlArr[0]) {
      case 'courses':
        return () => this.getCoursesBreadCrumbs(urlArr);
      default:
        return () => [{ text: 'Bread' }, { text: 'Crumbs' }];
    }
  }

  getCoursesBreadCrumbs(urlArr) {
    const crumbs: breadCrumbsType =
      urlArr.length === 1
        ? [{ text: 'Courses' }]
        : [{ text: 'Courses', path: '/courses' }];

    if (urlArr.length === 1) {
      return crumbs;
    }
    if (urlArr[1] === 'new') {
      return [...crumbs, { text: 'New' }];
    }
    if (urlArr[1].match(/^[0-9]*$/)) {
      const id = +urlArr[1];
      return [...crumbs, { text: this.coursesService.getCourse(id).title }];
    }
  }

  go(path) {
    this.router.navigateByUrl(path);
  }
}
