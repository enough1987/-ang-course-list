import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CourseListComponent } from './course-list.component';
import { MaterialModule } from '../../material/material.module';
import { CoursesService } from './../courses.service';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
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
      declarations: [ CourseListComponent ],
      imports: [ MaterialModule ],  // material is used in the template
      providers: [ { provide: CoursesService, useValue: coursesServiceStub } ],
      schemas: [ NO_ERRORS_SCHEMA ],
    });

    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
  });

  it('should instantiate successfully', () => {
    const coursesService = TestBed.get(CoursesService);
    const comp = new CourseListComponent(coursesService);

    expect(comp).toBeDefined();
  });

  it('should call coursesService.getCourses() method on init', () => {
    const coursesService = TestBed.get(CoursesService);

    const comp = new CourseListComponent(coursesService);

    expect(coursesService.getCourses).toHaveBeenCalled();
  });

});
