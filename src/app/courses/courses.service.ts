import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import { first } from 'rxjs/operators';

import { ConfigService } from '../core/services';
import { Course } from './course-list/course-list-item/course.model';
import {switchMap} from 'rxjs/internal/operators';


const dayms = 86400000;                       // milliseconds in a day

class ArgsForGetCourses {
  start: number;
  count: number;
  query?: string;
}

@Injectable()
export class CoursesService {

  private coursesSink$: Subject<Course[]> = new BehaviorSubject([]);
  courses$ = this.coursesSink$.asObservable();

  private coursesLengthSink$: Subject<number> = new BehaviorSubject(0);
  coursesLength$ = this.coursesLengthSink$.asObservable();

  private searchSink$: Subject<string> = new BehaviorSubject('');
  search$ = this.searchSink$.asObservable();

  nextId: number;

  constructor(
    @Inject(ConfigService) private config,
    private http: HttpClient,
  ) {}


  setSearch(query) {
    this.searchSink$.next(query);
    this.loadCourses(true);
  }

  loadCourses(newSearch: boolean) {

    combineLatest(this.search$, this.courses$)
      .pipe(
        first(),
        switchMap( ([query, courses]) => {

          const start = 0;
          const count = newSearch
            ? this.config.coursesPageLength
            : courses.length + this.config.coursesPageLength;

          return this.http.get(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}`, {
            params: {
              start,
              count,
              query
            }
          });
        })
      )
      .subscribe(data => {
        this.coursesSink$.next(data.courses);
        this.coursesLengthSink$.next(data.total);
      });
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

  updateCourse(partial: Partial<Course>) {  // GraphQL-like partial update, so using PATCH
    return this.http.patch(`${this.config.apiBaseUrl}/${this.config.apiEndpoints.courses}/${partial.id}`, partial);
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
