import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Course } from '../course-list/course-list-item/course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent {
  course: Course;
  title: string;
  description: string;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
  ) { }

  onSaveClick() {
  }

  onCancelClick() {
    this.router.navigateByUrl('/courses');
  }

}
