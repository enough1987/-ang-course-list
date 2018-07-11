import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course-list-item/course.model';

const numericSort = (a, b, key, order) => {
  if (order === 'asc') {
    return a[key] - b[key];
  }
  return b[key] - a[key];
};

const stringSort = (a, b, key, order) => {
  if (order === 'asc') {
    return a[key] >= b[key] ? 1 : -1;
  }
  return a[key] >= b[key] ? -1 : 1;
};

const booleanSort = (a, b, key, order) => {
  if (order === 'asc') {
    return a[key] ? 1 : -1;
  }
  return a[key] ? -1 : 1;
};

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
          return numericSort(a, b, key, order);

        case 'string':
          return stringSort(a, b, key, order);

        case 'boolean':
          return booleanSort(a, b, key, order);

        default:    // do not attempt to sort complex types
          return 0;
      }
    });
  }

}
