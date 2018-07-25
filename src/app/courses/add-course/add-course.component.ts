import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent implements OnInit {
  @Output() setRoute = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSaveClick() {
  }

  onCancelClick() {
    this.setRoute.emit('courses');
  }

}
