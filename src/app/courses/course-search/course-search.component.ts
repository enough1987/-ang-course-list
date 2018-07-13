import {
  Component,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.sass']
})
export class CourseSearchComponent {
  @Output() search = new EventEmitter<string>();

  query = '';

  onSearch() {
    this.search.emit(this.query);
  }

  onSearchClick() {
    this.onSearch();
  }

  onSubmit(e) {
    e.preventDefault();
    this.onSearch();
  }
}
