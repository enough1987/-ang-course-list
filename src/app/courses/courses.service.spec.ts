import { TestBed, inject } from '@angular/core/testing';

import { CoursesService, initCourses } from './courses.service';

describe('CoursesService', () => {
  describe('Testing a service using TestBed + inject', () => {
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
  });

  // https://angular.io/guide/testing#angular-testbed
  describe('Testing a service using TestBed only', () => {
    let service: CoursesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [CoursesService]
      });

      service = TestBed.get(CoursesService);
    });

    it('should get courses', () => {
      expect(service.getCourses()).toEqual(initCourses);
    });

    it('should delete course by id', () => {
      service.deleteCourse(1);
      expect(service.courses).toEqual([initCourses[1], initCourses[2]]);
    });
  });
});
