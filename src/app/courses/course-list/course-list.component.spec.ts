import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import { CourseListComponent } from './course-list.component';
import { MaterialModule } from '../../material/material.module';
import { ConfigService } from '../../core/services';
import { CoursesService } from '../courses.service';
import { DialogService } from '../../material/dialog/dialog.service';
import { OrderByPipe } from './order-by.pipe';

import { RouterStub } from '../../testing/router-stubs';
import { appRoutingPaths } from '../../app.routing.paths';

describe('CourseListComponent', () => {
  let fixture: ComponentFixture<CourseListComponent>;
  let config: any;

  const configStub = {
    apiBaseUrl: 'http://base.url/api',
    apiEndpoints: {
      courses: 'COURSES',
    },
    coursesPageLength: 2,
  };

  const coursesServiceStub: Partial<CoursesService> = {
    getCourses: () => of([
      {
        id: 42,
        creationDate: 1530287255,
        title: 'the Ultimate Course',
        durationMin: 123,
        description: 'on Life, the Universe, and Everything',
      },
      {
        id: 84,
        creationDate: 1530187255,
        title: 'Ultimate Part Two',
        durationMin: 200,
        description: 'on All the Good Things',
      },
    ]),
    deleteCourse: () => of({}),
  };

  const dialogServiceStub: Partial<DialogService> = {
    confirm: () => of(true),
  };

  const orderByPipeStub = { transform: arr => arr };

  describe('Testing a component: providing a stub service', () => {
    let component: CourseListComponent;
    let service: CoursesService;
    let dialogService: DialogService;
    let orderByPipe;
    let router;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [CourseListComponent],
        imports: [MaterialModule],  // material is used in the template
        providers: [
          { provide: ConfigService, useValue: configStub },
          { provide: CoursesService, useValue: coursesServiceStub },
          { provide: DialogService, useValue: dialogServiceStub },
          { provide: OrderByPipe, useValue: orderByPipeStub },
          { provide: Router, useClass: RouterStub },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseListComponent);

      // https://angular.io/guide/testing#get-injected-services
      config = TestBed.get(ConfigService);
      service = fixture.debugElement.injector.get(CoursesService);
      dialogService = fixture.debugElement.injector.get(DialogService);
      orderByPipe = fixture.debugElement.injector.get(OrderByPipe);
      router = fixture.debugElement.injector.get(Router);

      component = new CourseListComponent(config, service, dialogService, orderByPipe, router);
    });

    it('should instantiate successfully', () => {
      expect(component).toBeDefined();
    });

    it('should call coursesService.getCourses() method on init', () => {
      spyOn(service, 'getCourses').and.callThrough();
      component.ngOnInit();
      expect(service.getCourses).toHaveBeenCalled();
    });

    it('should navigate on edit', () => {
      spyOn(router, 'navigateByUrl');

      component.onEdit(42);

      expect(router.navigateByUrl).toHaveBeenCalledWith(`${appRoutingPaths.courses}/42`);
    });
  });

  // https://angular.io/guide/testing#component-class-testing
  describe('Testing a component: providing component and stub service', () => {
    let component: CourseListComponent;
    let service: CoursesService;
    let dialogService: DialogService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [CourseListComponent],
        imports: [MaterialModule],  // material is used in the template
        providers: [
          CourseListComponent,
          { provide: ConfigService, useValue: configStub },
          { provide: CoursesService, useValue: coursesServiceStub },
          { provide: DialogService, useValue: dialogServiceStub },
          { provide: OrderByPipe, useValue: orderByPipeStub },
          { provide: Router, useClass: RouterStub },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      config = TestBed.get(ConfigService);
      component = TestBed.get(CourseListComponent);
      service = TestBed.get(CoursesService);
      dialogService = TestBed.get(DialogService);
    });

    it('should call coursesService.getCourses() method on init', () => {
      spyOn(service, 'getCourses').and.callThrough();
      expect(service.getCourses).not.toHaveBeenCalled();
      component.ngOnInit();
      expect(service.getCourses).toHaveBeenCalled();
    });

    it('should reload courses if search query changed', () => {
      spyOn(service, 'getCourses').and.callThrough();

      const simpleChanges = {
        query: {
          currentValue: 'QUERY',
          previousValue: '',
          firstChange: false,
          isFirstChange: () => false,
        }
      };

      expect(service.getCourses).not.toHaveBeenCalled();
      component.ngOnChanges(simpleChanges);
      expect(service.getCourses).toHaveBeenCalled();
    });

    it('should not reload courses on the first change', () => {
      spyOn(service, 'getCourses').and.callThrough();

      const simpleChanges = {
        query: {
          currentValue: 'QUERY',
          previousValue: '',
          firstChange: true,
          isFirstChange: () => true,
        }
      };

      expect(service.getCourses).not.toHaveBeenCalled();
      component.ngOnChanges(simpleChanges);
      expect(service.getCourses).not.toHaveBeenCalled();
    });

    it('should not reload courses if query did not change', () => {
      spyOn(service, 'getCourses').and.callThrough();

      const simpleChanges = {
        query: {
          currentValue: 'QUERY',
          previousValue: 'QUERY',
          firstChange: false,
          isFirstChange: () => false,
        }
      };

      expect(service.getCourses).not.toHaveBeenCalled();
      component.ngOnChanges(simpleChanges);
      expect(service.getCourses).not.toHaveBeenCalled();
    });

    it('should call coursesService.deleteCourse() method on delete button click', () => {
      spyOn(dialogService, 'confirm').and.callThrough();
      spyOn(service, 'deleteCourse').and.callThrough();

      expect(service.deleteCourse).not.toHaveBeenCalled();
      component.onDelete(84);
      expect(service.deleteCourse).toHaveBeenCalledWith(84);
    });

    it('should not call coursesService.deleteCourse() method if not confirmed', () => {
      spyOn(dialogService, 'confirm').and.returnValue(of(false));
      spyOn(service, 'deleteCourse').and.callThrough();

      component.onDelete(84);
      expect(service.deleteCourse).not.toHaveBeenCalled();
    });

    it('should get courses on load click', () => {
      spyOn(service, 'getCourses').and.callThrough();
      component.onLoadClick();
      expect(service.getCourses).toHaveBeenCalled();
    });

    it('should pass non-empty string query to get courses on load click', () => {
      spyOn(service, 'getCourses').and.callThrough();
      component.query = 'QUERY';
      component.onLoadClick();
      expect(service.getCourses).toHaveBeenCalledWith({ query: 'QUERY', start: 0, count: 2 });
    });

    it('should pass non-empty string query to get courses on load courses', () => {
      spyOn(service, 'getCourses').and.callThrough();
      component.query = 'QUERY';
      component.loadCourses();
      expect(service.getCourses).toHaveBeenCalledWith({ query: 'QUERY', start: 0, count: 2 });
    });

    it('should not pass empty string query to get courses on load click', () => {
      spyOn(service, 'getCourses').and.callThrough();
      component.query = '';
      component.onLoadClick();
      expect(service.getCourses).toHaveBeenCalledWith({ start: 0, count: 2 });
    });

    it('should not pass empty string query to get courses on load courses', () => {
      spyOn(service, 'getCourses').and.callThrough();
      component.query = '';
      component.loadCourses();
      expect(service.getCourses).toHaveBeenCalledWith({ start: 0, count: 2 });
    });

    it('should disable future loading if loaded less courses than number of courses per page on load click', () => {
      spyOn(service, 'getCourses').and.returnValue(of([
        {
          id: 42,
          creationDate: 1530287255,
          title: 'the Ultimate Course',
          durationMin: 123,
          description: 'on Life, the Universe, and Everything',
        }
      ]));

      expect(component.done).toBe(false);
      component.onLoadClick();
      expect(component.done).toBe(true);
    });

    it('should disable future loading if loaded less courses than number of courses per page on load courses', () => {
      spyOn(service, 'getCourses').and.returnValue(of([]));

      expect(component.done).toBe(false);
      component.loadCourses();
      expect(component.done).toBe(true);
    });

  });
});
