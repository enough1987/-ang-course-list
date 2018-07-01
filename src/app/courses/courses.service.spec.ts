import { TestBed, inject } from '@angular/core/testing';

import { CoursesService, initCourses } from './courses.service';

describe('CoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService]
    });
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  it('should courses to initCourses on init', inject([CoursesService], (service: CoursesService) => {
    expect(service.courses).toEqual(initCourses);
  }));

  it('should get courses', inject([CoursesService], (service: CoursesService) => {
    expect(service.getCourses()).toEqual(initCourses);
  }));

  it('should delete course by id', inject([CoursesService], (service: CoursesService) => {
    service.deleteCourse(1);

    expect(service.courses).toEqual([initCourses[1], initCourses[2]]);
  }));

});
