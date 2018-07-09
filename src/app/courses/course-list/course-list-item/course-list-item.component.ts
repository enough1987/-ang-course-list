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
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<{ event: MouseEvent, id: number }>();

  classes: any = {};

  ngOnInit() {
    this.classes.card = {
      'mat-elevation-z': true,
      'mat-card_top-rated': this.course.topRated,
    };

    this.classes.title = {
      'mat-card-title_top-rated': this.course.topRated,
      'color_primary': !this.course.topRated,
    };
  }

  onEditClick() {
    this.edit.emit(this.course.id);
  }

  onDeleteClick(event: MouseEvent) {
    this.delete.emit({ event, id: this.course.id });
  }

}
