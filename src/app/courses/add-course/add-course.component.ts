import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass']
})
export class AddCourseComponent implements OnInit {
  title: string;
  description: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSaveClick() {
  }

  onCancelClick() {
    this.router.navigateByUrl('/courses');
  }

}
