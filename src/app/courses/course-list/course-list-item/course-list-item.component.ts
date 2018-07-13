import { Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Course } from './course.model';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.sass']
})
export class CourseListItemComponent implements OnInit {

  @Input() course: Course;

  @Input() isCourseUpcoming: boolean;
  @Input() isCourseFresh: boolean;

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<{ event: MouseEvent, id: number }>();

  classes: any = {};

  ngOnInit() {
    this.classes.title = {
      'mat-card-title_top-rated': this.course.topRated,
      'mat-card-title_upcoming': this.isCourseUpcoming,
      'mat-card-title_fresh': this.isCourseFresh,
      'color_primary': !this.course.topRated && !this.isCourseUpcoming && !this.isCourseFresh,
    };
  }

  onEditClick() {
    this.edit.emit(this.course.id);
  }

  onDeleteClick(event: MouseEvent) {
    this.delete.emit({ event, id: this.course.id });
  }

}
