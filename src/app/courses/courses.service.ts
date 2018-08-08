import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { ConfigService } from '../core/services';
import { Course } from './course-list/course-list-item/course.model';
import { tap } from 'rxjs/operators';

const dayms = 86400000;                       // milliseconds in a day

@Injectable()
export class CoursesService {
  courses: Course[] = [];
  nextId: number;

  constructor(
    @Inject(ConfigService) private config,
    private http: HttpClient,
  ) {}

  getCourses(config: { query?: string, start?: number, count?: number }): Observable<any> {
    console.log('config', config);
    console.log('Object.keys(config)', Object.keys(config));

    const keys = Object.keys(config);
    const params = keys.length
      ? keys.reduce((agg, key) => config[key] !== null ? { ...agg, [key]: config[key] } : agg, {})
      : null;

    console.log('params', params);

    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}`, { params });
  }

  getCourse(id: number): Observable<any> {
    return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}/${id}`);
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

    return this.http.post(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}`,  course);
  }

  updateCourse(partial: Partial<Course>) {
    return this.http.put(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}/${partial.id}`, partial);
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}/${id}`);
  }

  isCourseUpcoming(course: Course): boolean {
    return course.creationDate > Date.now();
  }

  isCourseFresh(course: Course): boolean {
    return course.creationDate < Date.now() && course.creationDate >= Date.now() - 14 * dayms;
  }

}
