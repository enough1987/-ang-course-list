import { async, TestBed } from '@angular/core/testing';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs.component';
import { MaterialModule } from '../../material/material.module';
import { CoursesService } from '../courses.service';
import { Course } from '../course-list/course-list-item/course.model';

import { RouterStub } from '../../testing/router-stubs';
import { appRoutingPaths } from '../../app.routing.paths';
import { coursesRoutingPaths } from '../courses.routing.paths';


describe('BreadcrumbsComponent', () => {
  const coursesServiceStub: Partial<CoursesService> = {
    getCourse() {
      return new Course(42, 1234567890, 'Title', 120, '');
    },
  };

  let component: BreadcrumbsComponent;
  let service: CoursesService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      imports: [MaterialModule],
      providers: [
        BreadcrumbsComponent,
        { provide: CoursesService, useValue: coursesServiceStub },
        { provide: Router, useClass: RouterStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(BreadcrumbsComponent);
    service = TestBed.get(CoursesService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init breadcrumbs based on the current router url on init', () => {
    router.navigateByUrl(`/${appRoutingPaths.courses}`);
    component.ngOnInit();
    expect(component.breadCrumbs).toEqual([{ text: 'Courses' }]);
  });

  it('should subscribe to future router events on init', () => {
    spyOn(router.events, 'subscribe');
    expect(router.events.subscribe).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(router.events.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
  });

  it('should react to future router events', () => {
    component.ngOnInit();

    router.navigateByUrl(`/${appRoutingPaths.courses}`);
    expect(component.breadCrumbs).toEqual([{ text: 'Courses' }]);
  });

  it('should reflect new course being added', () => {
    component.ngOnInit();

    router.navigateByUrl(`/${appRoutingPaths.courses}/${coursesRoutingPaths.new}`);
    expect(component.breadCrumbs).toEqual([
      { text: 'Courses', path: `/${appRoutingPaths.courses}` },
      { text: 'New' },
    ]);
  });

  it('should reflect an existing course being edited', () => {
    component.ngOnInit();

    router.navigateByUrl(`/${appRoutingPaths.courses}/42`);
    expect(component.breadCrumbs).toEqual([
      { text: 'Courses', path: `/${appRoutingPaths.courses}` },
      { text: 'Title' },
    ]);
  });

  it('should a linked courses breadcrumb in case of unknown second url segment', () => {
    component.ngOnInit();

    router.navigateByUrl(`/${appRoutingPaths.courses}/not-new-or-numeric`);
    expect(component.breadCrumbs).toEqual([{ text: 'Courses', path: `/${appRoutingPaths.courses}` }]);
  });

  it('should ignore router events other than navigation end', () => {
    spyOn(component, 'routeBreadCrumbsFactory');
    const ns = new NavigationStart(1, `/${appRoutingPaths.courses}`);
    component.updateBreadCrumbs(ns);
    expect(component.routeBreadCrumbsFactory).not.toHaveBeenCalled();
  });

  it('should navigate on click', () => {
    spyOn(router, 'navigateByUrl');
    component.go(`/${appRoutingPaths.courses}/${coursesRoutingPaths.new}`);
    expect(router.navigateByUrl).toHaveBeenCalledWith(`/${appRoutingPaths.courses}/${coursesRoutingPaths.new}`);
  });

  it('should unsubscribe on destroy', () => {
    component.ngOnInit();
    spyOn(component.sub, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.sub.unsubscribe).toHaveBeenCalled();
  });
});
