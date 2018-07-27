import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.sass']
})
export class CourseDurationComponent implements OnInit {
  @Input() durationMin: number;
  @Output() durationChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    console.log('this.durationMin', this.durationMin);
  }

  onChange() {
    console.log('emitting', this.durationMin);
    this.durationChange.emit(this.durationMin);
  }

}
