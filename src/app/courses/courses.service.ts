import { Injectable } from '@angular/core';
import { Course } from './course-list/course-list-item/course.model';

const dayms = 86400000;                       // milliseconds in a day
const freshDate = Date.now() - 7 * dayms;     // this one will always be fresh
const upcomingDate = Date.now() + 7 * dayms;  // this one will always be upcoming

export const initCourses = [
  new Course(1, upcomingDate, 'React', 224,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),

  new Course(2, freshDate, 'ES2015', 120,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),

  new Course(3, 1514073600000, 'Angular', 178,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    true),

  new Course(4, 1519776000000, 'TypeScript', 42,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),

  new Course(5, 1503723000000, 'GraphQL', 202,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),
];

@Injectable()
export class CoursesService {
  courses: Course[];

  constructor() {
    this.courses = [...initCourses];
  }

  getCourses(): Course[] {
    return this.courses;
  }

  deleteCourse(id) {
    this.courses = [...this.courses.filter(c => c.id !== id)];
  }

  isCourseUpcoming(course) {
    return course.creationDate > Date.now();
  }

  isCourseFresh(course) {
    return course.creationDate < Date.now() && course.creationDate >= Date.now() - 14 * dayms;
  }

}
