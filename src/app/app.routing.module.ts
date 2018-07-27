import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses/courses.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'courses/:id', component: AddCourseComponent },  // CHANGE ME TO EDIT
  { path: 'courses/add', component: AddCourseComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'product/:id', component: ProductCardComponent },
  // { path: 'checkout', loadChildren: 'app/checkout/checkout.module#CheckoutModule' },
  // { path: 'admin', canLoad: [AuthGuard], loadChildren: 'app/admin/admin.module#AdminModule' },
  // { path: 'display', component: ModalComponent, outlet: 'modal' },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  // { path: '**', component: NotFoundComponent },
  { path: '**', component: CoursesComponent },
];

export const appRouterComponents = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
