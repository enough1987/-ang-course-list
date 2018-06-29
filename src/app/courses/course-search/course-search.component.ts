import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.sass']
})
export class CourseSearchComponent {
  searchInput = '';

  onSearchClick() {
    console.log(`Searching for ${this.searchInput}`);
  }
}
