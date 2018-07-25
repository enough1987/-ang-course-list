import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { of } from 'rxjs';

import { CourseListComponent } from './course-list.component';
import { MaterialModule } from '../../material/material.module';
import { CoursesService } from '../courses.service';
import { DialogService } from '../../material/dialog/dialog.service';
import { OrderByPipe } from './order-by.pipe';
import { SearchPipe } from '../course-search/search.pipe';

import mouseEvent from '../../testing/mouse-event.stub';

describe('CourseListComponent', () => {
  let fixture: ComponentFixture<CourseListComponent>;

  const coursesServiceStub: Partial<CoursesService> = {
    getCourses: () => [
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
    ],
    deleteCourse: jasmine.createSpy('deleteCourse'),
  };

  const dialogServiceStub: Partial<DialogService> = {
    confirm: jasmine.createSpy('confirm').and.returnValue(of(true)),
  };

  const orderByPipeStub = { transform: arr => arr };
  const searchPipeStub = { transform: arr => arr };

  describe('Testing a component: providing a stub service', () => {
    let component: CourseListComponent;
    let service: CoursesService;
    let dialogService: DialogService;
    let orderByPipe;
    let searchPipe;

    beforeEach(async(() => {
      spyOn(coursesServiceStub, 'getCourses');
      spyOn(console, 'log');

      TestBed.configureTestingModule({
        declarations: [CourseListComponent],
        imports: [MaterialModule],  // material is used in the template
        providers: [
          { provide: CoursesService, useValue: coursesServiceStub },
          { provide: DialogService, useValue: dialogServiceStub },
          { provide: OrderByPipe, useValue: orderByPipeStub },
          { provide: SearchPipe, useValue: searchPipeStub },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseListComponent);

      // https://angular.io/guide/testing#get-injected-services
      service = fixture.debugElement.injector.get(CoursesService);
      dialogService = fixture.debugElement.injector.get(DialogService);
      orderByPipe = fixture.debugElement.injector.get(OrderByPipe);
      searchPipe = fixture.debugElement.injector.get(SearchPipe);

      component = new CourseListComponent(service, dialogService, orderByPipe, searchPipe);
    });

    it('should instantiate successfully', () => {
      expect(component).toBeDefined();
    });

    it('should call coursesService.getCourses() method on init', () => {
      component.ngOnInit();
      expect(service.getCourses).toHaveBeenCalled();
    });

    it('should log to console on edit', () => {
      component.onEdit(42);

      expect(console.log).toHaveBeenCalledWith('Editing course #42');
    });
  });

  // https://angular.io/guide/testing#component-class-testing
  describe('Testing a component: providing component and stub service', () => {
    let component: CourseListComponent;
    let service: CoursesService;
    let dialogServiceSpy: jasmine.SpyObj<DialogService>;

    beforeEach(async(() => {
      spyOn(coursesServiceStub, 'getCourses');
      spyOn(console, 'log');

      const spy = jasmine.createSpyObj('DialogService', {
        confirm: of(true),
      });

      TestBed.configureTestingModule({
        declarations: [CourseListComponent],
        imports: [MaterialModule],  // material is used in the template
        providers: [
          CourseListComponent,
          { provide: CoursesService, useValue: coursesServiceStub },
          { provide: DialogService, useValue: spy },
          { provide: OrderByPipe, useValue: orderByPipeStub },
          { provide: SearchPipe, useValue: searchPipeStub },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      component = TestBed.get(CourseListComponent);
      service = TestBed.get(CoursesService);
      dialogServiceSpy = TestBed.get(DialogService);
    });

    afterEach(() => {
      (service.deleteCourse as any).calls.reset();
    });

    it('should call coursesService.getCourses() method on init', () => {
      expect(service.getCourses).not.toHaveBeenCalled();
      component.ngOnInit();
      expect(service.getCourses).toHaveBeenCalled();
    });

    it('should reload courses if search query changed', () => {
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
      dialogServiceSpy.confirm.and.returnValue(of(true));

      component.onDelete(84);

      expect(service.deleteCourse).toHaveBeenCalledWith(84);
    });

    it('should log to console on load click', () => {
      component.onLoadClick(mouseEvent);

      expect(console.log).toHaveBeenCalledWith('Loading more courses. MouseEvent: ', mouseEvent);
    });

    it('should not call coursesService.deleteCourse() method if not confirmed', () => {
      dialogServiceSpy.confirm.and.returnValue(of(false));

      component.onDelete(84);

      expect(service.deleteCourse).not.toHaveBeenCalled();
    });
  });
});
