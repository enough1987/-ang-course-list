import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CoursesComponent } from './courses/courses/courses.component';
// import { AddCourseComponent } from './courses/add-course/add-course.component';
// import { EditCourseComponent } from './courses/edit-course/edit-course.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'courses', canLoad: [AuthGuard], loadChildren: './courses/courses.module#CoursesModule' },
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' },

  // { path: 'courses/new', component: AddCourseComponent },
  // { path: 'courses/:id', component: EditCourseComponent },
  // { path: 'courses', component: CoursesComponent },
  // { path: 'checkout', loadChildren: 'app/checkout/checkout.module#CheckoutModule' }
  // { path: 'admin', canLoad: [AuthGuard], loadChildren: 'app/admin/admin.module#AdminModule' },
];

export const appRouterComponents = [];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true }  // enable for debugging
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
