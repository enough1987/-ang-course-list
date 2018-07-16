import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Course } from './course-list-item/course.model';
import { CoursesService } from '../courses.service';
import { OrderByPipe } from './order-by.pipe';
import { SearchPipe } from '../course-search/search.pipe';
import { DialogService } from '../../material/dialog/dialog.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass']
})
export class CourseListComponent implements OnChanges, OnInit {
  @Input() query: string;

  courses: Course[];

  constructor(
    private coursesService: CoursesService,
    private dialogService: DialogService,
    private orderByPipe: OrderByPipe,
    private searchPipe: SearchPipe,
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { currentValue, previousValue, firstChange } = changes.query;

    if (!firstChange && currentValue !== previousValue) {
      this.loadCourses();
    }
  }

  loadCourses() {
    this.courses = this.searchPipe.transform(
      this.orderByPipe.transform(
        this.coursesService.getCourses()
      ),
      this.query,
    );

  }

  onEdit(id: number) {
    console.log(`Editing course #${id}`);
  }

  // https://blog.mariusschulz.com/2015/11/13/typing-destructured-object-parameters-in-typescript
  onDelete({ event, id }: { event: MouseEvent, id: number }) {
    this.dialogService
      .confirm('Do you really want to delete this course?')
      .subscribe(confirmed => {
        if (confirmed) {
          this.coursesService.deleteCourse(id);
          this.loadCourses();
          console.log(this);
        }
      });
  }

  onLoadClick(e: MouseEvent) {
    console.log('Loading more courses. MouseEvent: ', e);
  }
}
