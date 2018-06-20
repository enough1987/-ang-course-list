import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass']
})
export class CoursesComponent implements OnInit {
  searchInput = 'initial';

  constructor() {
    console.log(this.searchInput);
  }

  ngOnInit() {
  }

  onLoadClick(e: MouseEvent) {
    console.log('Loading more courses. MouseEvent: ', e);
    console.log(this.searchInput);
  }
}
