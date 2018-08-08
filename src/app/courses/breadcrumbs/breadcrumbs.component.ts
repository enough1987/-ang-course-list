import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, RouterEvent } from '@angular/router';

import { Subscription, Subscriber } from 'rxjs';

import { CoursesService } from '../courses.service';
import { appRoutingPaths } from '../../app.routing.paths';
import { coursesRoutingPaths } from '../courses.routing.paths';

type breadCrumbsType = { text: string, path?: string }[];

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  breadCrumbs: breadCrumbsType;

  public sub: Subscription;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initBreadCrumbs(this.router.url);
    this.sub = new Subscriber();
    this.sub.add(this.router.events.subscribe((event: RouterEvent) => this.updateBreadCrumbs(event)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initBreadCrumbs(url: string) {
    this.breadCrumbs = this.routeBreadCrumbsFactory(url)();
  }

  updateBreadCrumbs(routerEvent: RouterEvent) {
    if (routerEvent instanceof NavigationEnd) {
      this.breadCrumbs = this.routeBreadCrumbsFactory(routerEvent.urlAfterRedirects)();
    }
  }

  routeBreadCrumbsFactory(url: string = ''): () => breadCrumbsType {
    // router.url might not have a leading slash, navigationEvent.urlAfterRedirects always does
    const urlArr = url[0] === '/' ? url.split('/').slice(1) : url.split('/');

    switch (urlArr[0]) {
      case 'courses':
        return () => this.getCoursesBreadCrumbs(urlArr);
      default:
        return () => [{ text: 'Bread' }, { text: 'Crumbs' }];
    }
  }

  getCoursesBreadCrumbs(urlArr: string[]): breadCrumbsType {
    if (urlArr.length === 1) {
      return [{ text: 'Courses' }];
    }

    const crumbs = [{ text: 'Courses', path: appRoutingPaths.courses }];

    if (urlArr[1] === coursesRoutingPaths.new) {
      return [...crumbs, { text: 'New' }];
    }
    if (urlArr[1].match(/^[0-9]*$/)) {
      const id = +urlArr[1];

      this.coursesService.getCourse(id).subscribe(course =>
        this.breadCrumbs = [...crumbs, { text: course.title }]);
    }
    return crumbs;
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }
}
