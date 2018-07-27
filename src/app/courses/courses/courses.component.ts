import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent {
  @Output() setRoute = new EventEmitter<string>();

  query = '';

  constructor(private router: Router) {}

  onSearch(query) {
    this.query = query;
  }

  onAddCourse() {
    this.router.navigateByUrl('/courses/new');
  }
}
