import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.sass']
})
export class CourseDateComponent implements OnInit {
  @Input() creationDate: number;
  @Output() dateChange = new EventEmitter<number>();

  date: FormControl;
  startDate: Date;

  constructor() { }

  ngOnInit() {
    console.log(this.creationDate);
    this.startDate = new Date(this.creationDate);
    this.date = new FormControl(new Date(this.creationDate));

  }

  onDateChange() {
    // console.log(this.date.value.getTime());
    this.dateChange.emit(this.date.value.getTime());
  }

}
