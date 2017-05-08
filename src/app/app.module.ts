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

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CountersComponent,
    CourseFormComponent,
    MyInputComponent,
    ValidationErrorsComponent,
    ReactiveCourseFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
     CourseService,
     CourseInitiator,
     {provide: COURSE_TYPES_WITH_NAMES_KEY, useValue: courseTypesWithNames}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
