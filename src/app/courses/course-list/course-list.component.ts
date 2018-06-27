import { Component } from '@angular/core';
import { Course } from './course-list-item/course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass']
})
export class CourseListComponent {
  courses: Course[];

  constructor(private coursesService: CoursesService) {
    this.courses = coursesService.getCourses();
  }

  onEdit(id: number) {
    console.log(`Editing course #${id}`);
  }

  // https://blog.mariusschulz.com/2015/11/13/typing-destructured-object-parameters-in-typescript
  onDelete({ event, id }: { event: MouseEvent, id: number }) {
    console.log(`Deleting course #${id}. Original MouseEvent:`, event);

    this.coursesService.deleteCourse(id);
    this.courses = this.coursesService.getCourses();
  }
}
