import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.sass']
})
export class CourseDurationComponent {
  @Input() durationMin: number;
  @Output() durationChange = new EventEmitter<number>();

  onChange() {
    this.durationChange.emit(this.durationMin);
  }

}
