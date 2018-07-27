import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { Course } from '../course-list/course-list-item/course.model';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.sass']
})
export class EditCourseComponent implements OnInit, OnDestroy {
  course: Course;
  title: string;
  description: string;

  private sub: Subscription;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.course = this.coursesService.getCourse(+params.id);
    });

    console.log('was', this.course.creationDate);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onDurationChange(durationMin) {
    this.course.durationMin = durationMin;
  }

  onDateChange(dateUnixMsecs: number) {  // Unix epoch, msecs
    this.course.creationDate = dateUnixMsecs;
    console.log('now', this.course.creationDate);
  }

  onSaveClick() {
  }

  onCancelClick() {
    this.router.navigateByUrl('/courses');
  }

}
