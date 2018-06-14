import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { CoursesComponent } from './courses/courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseListItemComponent } from './course-list/course-list-item/course-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    CoursesComponent,
    CourseListComponent,
    CourseSearchComponent,
    CourseListItemComponent
  ],
  exports: [CoursesComponent],
})
export class CoursesModule { }
