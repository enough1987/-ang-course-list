import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CoursesComponent } from './courses/courses.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseListItemComponent } from './course-list/course-list-item/course-list-item.component';
import { CoursesService } from './courses.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    CoursesComponent,
    CourseListComponent,
    CourseSearchComponent,
    CourseListItemComponent
  ],
  providers: [CoursesService],
  exports: [CoursesComponent],
})
export class CoursesModule {}
