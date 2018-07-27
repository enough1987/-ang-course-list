import { Injectable } from '@angular/core';
import { Course } from './course-list/course-list-item/course.model';

const dayms = 86400000;                       // milliseconds in a day
const freshDate = Date.now() - 7 * dayms;     // this one will always be fresh
const upcomingDate = Date.now() + 7 * dayms;  // this one will always be upcoming

export const initCourses = [
  new Course(1, upcomingDate, 'React', 224,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),

  new Course(2, freshDate, 'ES2015', 120,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),

  new Course(3, 1514073600000, 'Angular', 178,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    true),

  new Course(4, 1519776000000, 'TypeScript', 42,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),

  new Course(5, 1503723000000, 'GraphQL', 202,
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`),
];

@Injectable()
export class CoursesService {
  courses: Course[];
  nextId: number;

  constructor() {
    this.courses = [...initCourses];
    this.nextId = initCourses.length + 1;
  }

  getCourses(): Course[] {
    return this.courses;
  }

  getCourse(id): Course {
    return { ...this.courses.find(c => c.id === id) }; // keep it pure
  }

  createCourse(partial: Partial<Course>) {
    const { creationDate, title, durationMin, description } = partial; // can't create a top-rated course right away
    const course = new Course(
      this.nextId++,
      creationDate || Date.now(),   // future supported
      title,
      durationMin,
      description,
    );

    this.courses.push(course);
  }

  updateCourse(partial: Partial<Course>) {
    this.courses = this.courses.map(course => {
      if (course.id === partial.id) {   // supports graphql-like partial update
        const partialApplied = { ...course, ...partial };
        const { id, creationDate, title, durationMin, description, topRated } = partialApplied;
        return new Course(id, creationDate, title, durationMin, description, topRated);
      }
      return course;
    });
  }

  deleteCourse(id) {
    this.courses = this.courses.filter(c => c.id !== id);
  }

  isCourseUpcoming(course) {
    return course.creationDate > Date.now();
  }

  isCourseFresh(course) {
    return course.creationDate < Date.now() && course.creationDate >= Date.now() - 14 * dayms;
  }

}
