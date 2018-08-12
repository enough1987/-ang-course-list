import { Component, Input, OnInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { DialogService } from '../../material/dialog/dialog.service';
import { appRoutingPaths } from '../../app.routing.paths';
import { ConfigService } from '../../core/services';
import {Observable} from 'rxjs';
import {Course} from './course-list-item/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass']
})
export class CourseListComponent implements OnChanges, OnInit {

  coursesLength$: Observable<number> = this.coursesService.coursesLength$;
  courses$: Observable<Course[]> = this.coursesService.courses$;

  constructor(
    @Inject(ConfigService) private config,
    private coursesService: CoursesService,
    private dialogService: DialogService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadCourses(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    const { currentValue, previousValue, firstChange } = changes.query;

    if (!firstChange && currentValue !== previousValue) {
      this.loadCourses();
    }
  }

  onEdit(id: number) {
    this.router.navigateByUrl(`${appRoutingPaths.courses}/${id}`);
  }

  onDelete(id: number) {
    this.dialogService
      .confirm('Do you really want to delete this course?')
      .subscribe(confirmed => {
        if (confirmed) {
          this.coursesService.deleteCourse(id).subscribe(() => this.loadCourses());
        }
      });
  }

  loadCourses(newCourses: boolean = false) {
    this.coursesService.loadCourses(newCourses);
  }

}
