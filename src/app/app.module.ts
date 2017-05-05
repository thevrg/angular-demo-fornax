import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { CountersComponent } from './counters/counters.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { FormComponentComponent } from './form-component/form-component.component';
import { CourseService, CourseInitiator } from './course-service';
import { MyInputComponent } from './my-input/my-input.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CountersComponent,
    CourseFormComponent,
    FormComponentComponent,
    MyInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ { provide: 'FRUIT', useValue: 'AppModule' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
