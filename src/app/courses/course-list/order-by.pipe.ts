import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course-list-item/course.model';

@Pipe({
  name: 'orderBy',
  // pure: true;    // pipes are pure by default
})
export class OrderByPipe implements PipeTransform {

  transform(courses: Course[], key = 'creationDate', order = 'desc'): Course[] {
    const arr = [...courses];    // keep it pure

    return arr.sort((a, b) => {
      switch (typeof(a[key])) {
        case 'number':
          return order === 'asc' ? a[key] - b[key] : b[key] - a[key];

        case 'string':
          return order === 'asc' ? (a[key] >= b[key] ? 1 : -1) : (a[key] >= b[key] ? -1 : 1);

        case 'boolean':
          return order === 'asc' ? (a[key] ? 1 : -1) : (a[key] ? -1 : 1);

        default:    // do not attempt to sort complex types
          return 0;
      }
    });
  }

}
