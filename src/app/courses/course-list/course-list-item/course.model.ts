import { CourseInterface } from './course.interface';

export class Course implements CourseInterface {
  constructor(
    public id: number,
    public creationDate: number,
    public title: string,
    public durationMin?: number,
    public description?: string,
  ) {
    this.durationMin = durationMin || 0;
    this.description = description || '';
  }
}
