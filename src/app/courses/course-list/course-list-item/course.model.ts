import { CourseInterface } from './course.interface';

export class Course implements CourseInterface {
  constructor(
    public id: number,
    public creationDate: number,
    public title: string,
    public durationMin?: number,
    public description?: string,
    public topRated?: boolean,
  ) {
    this.durationMin = durationMin || 0;
    this.description = description || '';
    this.topRated = topRated || false;
  }
}
