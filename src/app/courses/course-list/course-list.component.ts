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
}
