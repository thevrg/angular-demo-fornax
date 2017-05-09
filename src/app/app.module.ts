import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { CountersComponent } from './counters/counters.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseService, CourseInitiator } from './course-service';
import { MyInputComponent } from './my-input/my-input.component';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import { ReactiveCourseFormComponent } from './reactive-course-form/reactive-course-form.component';
import { courseTypesWithNames, COURSE_TYPES_WITH_NAMES_KEY } from './course';
import { AsyncDemoComponent } from './async-demo/async-demo.component';
import { RouterDemoComponent } from './router-demo/router-demo.component';
import { TemplateDemoComponent } from './template-demo/template-demo.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserService } from './users/user-service';
import { AsyncCourseService } from './async-course-service';
import { AppRoutingModule } from './app-routing.module';
import {UsersModule} from './users/users.module';


@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CountersComponent,
    CourseFormComponent,
    MyInputComponent,
    ValidationErrorsComponent,
    ReactiveCourseFormComponent,
    AsyncDemoComponent,
    RouterDemoComponent,
    TemplateDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    UsersModule
  ],
  providers: [
    CourseService,
    AsyncCourseService,
    UserService,
    CourseInitiator,
    { provide: COURSE_TYPES_WITH_NAMES_KEY, useValue: courseTypesWithNames }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
