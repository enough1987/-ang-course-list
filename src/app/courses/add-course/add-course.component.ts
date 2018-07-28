import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NewCourse } from '../course-list/course-list-item/course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent {
  course: NewCourse;
  isSubmitting = false;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
  ) {
    this.course = new NewCourse(Date.now(), '', 0, '');
  }

  onDurationChange(durationMin) {
    this.course.durationMin = durationMin;
  }

  onDateChange(dateUnixMsecs: number) {  // Unix epoch, msecs
    this.course.creationDate = dateUnixMsecs;
  }

  onSaveClick() {
    this.isSubmitting = true;
    this.coursesService.createCourse(this.course);
    this.router.navigateByUrl('/courses');
  }

  onCancelClick() {
    this.router.navigateByUrl('/courses');
  }

}
