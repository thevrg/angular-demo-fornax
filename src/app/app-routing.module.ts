import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseFormComponent } from './course-form/course-form.component';
import { ReactiveCourseFormComponent } from './reactive-course-form/reactive-course-form.component';
import { CountersComponent } from './counters/counters.component';
import { RouterDemoComponent } from './router-demo/router-demo.component';
import { AsyncDemoComponent } from './async-demo/async-demo.component';
import { UserListComponent } from './users/user-list/user-list.component';

export const appRoutes: Routes = [
  { path: 'form', component: CourseFormComponent },
  { path: 'reactive-form', component: ReactiveCourseFormComponent },
  { path: 'counters', component: CountersComponent },
  { path: 'counters/:red/:green/:blue', component: CountersComponent },
  {
    path: 'router', component: RouterDemoComponent,
    children:
      [
        { path: 'counters', component: CountersComponent },
        { path: 'form', component: CourseFormComponent }
      ]
  },
  { path: 'async', component: AsyncDemoComponent },
  { path: '',   redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
