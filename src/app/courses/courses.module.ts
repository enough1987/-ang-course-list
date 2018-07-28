import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseDateComponent } from './course-date/course-date.component';
import { CourseDurationComponent } from './course-duration/course-duration.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { CoursesRoutingModule, coursesRouterComponents } from './courses.routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
  ],
  declarations: [
    // CoursesComponent,  // ?
    CourseListComponent,
    CourseSearchComponent,
    CourseListItemComponent,
    DurationPipe,
    OrderByPipe,
    SearchPipe,
    HighlightDirective,
    CoursesListNoDataComponent,
    CourseAddButtonComponent,
    // AddCourseComponent, // ?
    // EditCourseComponent, // ?
    CourseDateComponent,
    CourseDurationComponent,
    BreadcrumbsComponent,
    coursesRouterComponents
  ],
  providers: [
    CoursesService,
    OrderByPipe,
    SearchPipe,
  ],
  exports: [
    // CoursesComponent,  // no need to export anymore?
    // AddCourseComponent,  // no need to export anymore?
    // EditCourseComponent,  // no need to export anymore?
  ],
})
export class CoursesModule {}
