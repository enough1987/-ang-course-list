import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoursesService } from '../courses.service';
import { appRoutingPaths } from '../../app.routing.paths';
import { coursesRoutingPaths } from '../courses.routing.paths';

type breadCrumbsType = { text: string, path?: string }[];

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.sass']
})
export class BreadcrumbsComponent implements OnInit {
  breadCrumbs: breadCrumbsType;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.initBreadCrumbs(this.router.url);
  }

  initBreadCrumbs(url: string) {
    // router.url might not have a leading slash
    const urlArr = url[0] === '/' ? url.split('/').slice(1) : url.split('/');

    switch (urlArr[0]) {
      case 'courses':
        this.initCoursesBreadCrumbs(urlArr);
        break;
      default:
        this.breadCrumbs = [{ text: 'Bread' }, { text: 'Crumbs' }];
    }
  }

  initCoursesBreadCrumbs(urlArr: string[]): void {
    if (urlArr.length === 1) {
      this.breadCrumbs = [{ text: 'Courses' }];
    } else {
      const crumbs = [{ text: 'Courses', path: appRoutingPaths.courses }];

      if (urlArr[1] === coursesRoutingPaths.new) {
        this.breadCrumbs = [...crumbs, { text: 'New' }];
      } else if (urlArr[1].match(/^[0-9]*$/)) {
        const id = +urlArr[1];
        this.coursesService.getCourse(id).subscribe(course => {
          this.breadCrumbs = [...crumbs, { text: course.title }];
        });
      } else {
        this.breadCrumbs = crumbs;
      }
    }
  }

  go(path: string) {
    this.router.navigateByUrl(path);
  }
}
