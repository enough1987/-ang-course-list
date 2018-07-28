import { CourseInterface } from './course.interface';

export class NewCourse implements Partial<CourseInterface> {
  constructor(
    public creationDate: number,
    public title: string,
    public durationMin: number,
    public description: string,
  ) {
  }
}

export class Course extends NewCourse implements CourseInterface {
  public id: number;
  public topRated?: boolean;

  constructor(id, creationDate, title, durationMin?, description?, topRated?) {
    super(creationDate, title, durationMin, description);
    this.id = id;
    this.topRated = topRated || false;
  }
}
