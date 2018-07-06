import { Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Course } from './course.model';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.sass']
})
export class CourseListItemComponent implements
  OnChanges,
  OnInit {

  @Input() course: Course;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<{ event: MouseEvent, id: number }>();

  constructor() {
    console.log('constructor');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges, SimpleChanges object: ', changes);
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  parseTime(): string {
    const min = this.course.durationMin;
    return `${Math.floor(min / 60)}h ${String((min % 60)).padStart(2, '0') }m`;
  }

  parseDate(): string {
    const unixDate = this.course.creationDate;
    const date = new Date(unixDate * 1000);
    return `${date.getDate()}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  }

  onEditClick() {
    this.edit.emit(this.course.id);
  }

  onDeleteClick(event: MouseEvent) {
    this.delete.emit({ event, id: this.course.id });
  }

}
