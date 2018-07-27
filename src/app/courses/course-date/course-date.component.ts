import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.sass']
})
export class CourseDateComponent implements OnInit {
  date: string;

  constructor() { }

  ngOnInit() {
  }

}
