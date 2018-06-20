import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from './course.model';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.sass']
})
export class CourseListItemComponent {
  @Input() course: Course;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<{ event: MouseEvent, id: number }>();

  constructor() {
  }

  parseTime() {
    const min = this.course.durationMin;
    return `${Math.floor(min / 60)}h ${String((min % 60)).padStart(2, '0') }m`;
  }

  parseDate() {
    const unixDate = this.course.creationDate;
    const date = new Date(unixDate * 1000);
    return `${date.getDate()}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  }

  onEditClick(): void {
    this.edit.emit(this.course.id);
  }

  onDeleteClick(event: MouseEvent): void {
    this.delete.emit({ event, id: this.course.id });
  }

}
