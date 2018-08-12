import {
  Component,
} from '@angular/core';
import {CoursesService} from '../courses.service';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.sass']
})
export class CourseSearchComponent {

  query = '';

  constructor(
    private coursesService: CoursesService,
  ) {}

  onSearch() {
    this.coursesService.setSearch(this.query);
  }

  onSearchClick() {
    this.onSearch();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.onSearch();
  }
}
