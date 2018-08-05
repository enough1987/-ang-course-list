import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

import { coursesRoutingPaths as paths } from './courses.routing.paths';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: paths.new, component: AddCourseComponent },
      { path: ':id', component: EditCourseComponent },
      { path: '', component: CoursesComponent },
    ],
  }
];

export const coursesRouterComponents = [
  AddCourseComponent,
  EditCourseComponent,
  CoursesComponent,
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [],
  exports: [
    RouterModule,
  ],
  providers: [],
})
export class CoursesRoutingModule {}
