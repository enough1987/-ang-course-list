import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { CoursesComponent } from './courses/courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseListItemComponent } from './course-list/course-list-item/course-list-item.component';
import { CoursesService } from './courses.service';
import { DurationPipe } from './course-list/course-list-item/duration.pipe';
import { OrderByPipe } from './course-list/order-by.pipe';
import { SearchPipe } from './course-search/search.pipe';
import { HighlightDirective } from './course-list/course-list-item/highlight.directive';
import { CoursesListNoDataComponent } from './course-list/courses-list-no-data/courses-list-no-data.component';
import { CourseAddButtonComponent } from './course-add-button/course-add-button.component';
import { CourseAddFormComponent } from './course-add-form/course-add-form.component';
import { CourseEditFormComponent } from './course-edit-form/course-edit-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  declarations: [
    CoursesComponent,
    CourseListComponent,
    CourseSearchComponent,
    CourseListItemComponent,
    DurationPipe,
    OrderByPipe,
    SearchPipe,
    HighlightDirective,
    CoursesListNoDataComponent,
    CourseAddButtonComponent,
    CourseAddFormComponent,
    CourseEditFormComponent,
  ],
  providers: [
    CoursesService,
    OrderByPipe,
    SearchPipe,
  ],
  exports: [CoursesComponent],
})
export class CoursesModule {}
