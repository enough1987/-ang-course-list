import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';

import { CourseListComponent } from './course-list.component';
import { MaterialModule } from '../../material/material.module';
import { CoursesService } from './../courses.service';

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
    deleteCourse: () => {},
  };

  beforeEach(() => {
    spyOn(coursesServiceStub, 'getCourses');
    spyOn(console, 'log');

    TestBed.configureTestingModule({
      declarations: [CourseListComponent],
      imports: [MaterialModule],  // material is used in the template
      providers: [{ provide: CoursesService, useValue: coursesServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(CourseListComponent);
  });

  it('should instantiate successfully', () => {
    const coursesService = TestBed.get(CoursesService);

    const comp = new CourseListComponent(coursesService);

    expect(comp).toBeDefined();
  });

  it('should call coursesService.getCourses() method on init', () => {
    // https://angular.io/guide/testing#get-injected-services
    const coursesService = fixture.debugElement.injector.get(CoursesService);

    const comp = new CourseListComponent(coursesService);

    expect(coursesService.getCourses).toHaveBeenCalled();
  });

  it('should log to console on edit', () => {
    // https://angular.io/guide/testing#testbedget
    const coursesService = TestBed.get(CoursesService);

    const comp = new CourseListComponent(coursesService);
    comp.onEdit(42);

    expect(console.log).toHaveBeenCalledWith('Editing course #42');
  });

  it('should log to console on edit', () => {
    const coursesService = TestBed.get(CoursesService);

    const comp = new CourseListComponent(coursesService);

    comp.onDelete({
      event: mouseEvent,
      id: 84,
    });

    expect(console.log).toHaveBeenCalledWith(
      jasmine.stringMatching('Deleting course #84. Original MouseEvent:'),
      mouseEvent
    );
  });

});
