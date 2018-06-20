import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.sass']
})
export class CourseSearchComponent {
  @Input() searchInput: string;
  @Output() searchInputChange = new EventEmitter<string>();

  ngModelInput: string;  // ngModel input

  constructor() {
    console.log(this.searchInput);
  }

  onSearchClick() {
    console.log(this.searchInput);
    console.log('search', this.ngModelInput);
  }

  onInputChange(e) {
    console.log(e.target.value);
    console.log(this.searchInput);
    console.log('emitting', e.target.value);
    this.searchInputChange.emit(e.target.value);
  }
}
