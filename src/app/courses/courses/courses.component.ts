import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent {
  @Output() setRoute = new EventEmitter<string>();

  query = '';

  onSearch(query) {
    this.query = query;
  }

  onAddCourse() {
    this.setRoute.emit('addCourse');
  }
}
