import { TestBed, inject } from '@angular/core/testing';

import { CoursesService, initCourses } from './courses.service';

xdescribe('CoursesService', () => {
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

    it('should get course by id', () => {
      expect(service.getCourse(2)).toEqual(initCourses[1]);
    });

    it('should update course', () => {
      service.updateCourse({  // graphql-like partial update
        id: 1,
        title: 'TITLE',
      });
      expect({...service.getCourse(1)}).toEqual({ ...initCourses[0], title: 'TITLE' });
    });

    it('should delete course by id', () => {
      service.deleteCourse(1);
      expect(service.courses).toEqual([initCourses[1], initCourses[2], initCourses[3], initCourses[4]]);
    });

    it('should create a course with a specific creation date', () => {
      service.createCourse({
        creationDate: 1234567890111,
        title: 'NEW TITLE',
        durationMin: 120,
        description: 'NEW DESCRIPTION',
      });
      expect({ ...service.courses[5] }).toEqual({
        id: 6,
        creationDate: 1234567890111,
        title: 'NEW TITLE',
        durationMin: 120,
        description: 'NEW DESCRIPTION',
        topRated: false,
      });
    });

    it('should create a course with a current creation date', () => {
      const originalDateNow = Date.now;

      Date.now = () => 1234567890123;

      service.createCourse({
        title: 'NEW TITLE',
        durationMin: 120,
        description: 'NEW DESCRIPTION',
      });
      expect({ ...service.courses[5] }).toEqual({
        id: 6,
        creationDate: 1234567890123,
        title: 'NEW TITLE',
        durationMin: 120,
        description: 'NEW DESCRIPTION',
        topRated: false,
      });

      Date.now = originalDateNow;
    });

    it('should identify a course as upcoming', () => {
      expect(service.isCourseUpcoming(initCourses[0])).toBe(true);
    });

    it('should identify a course as fresh', () => {
      expect(service.isCourseFresh(initCourses[1])).toBe(true);
    });

    it('should identify a course as not upcoming', () => {
      expect(service.isCourseUpcoming(initCourses[1])).toBe(false);
    });

    it('should identify a course as not fresh', () => {
      expect(service.isCourseFresh(initCourses[0])).toBe(false);
    });
  });
});
