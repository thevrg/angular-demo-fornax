import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterDemoComponent } from './router-demo.component';
import { Router, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { CourseFormComponent } from '../course-form/course-form.component';
import { ReactiveCourseFormComponent } from '../reactive-course-form/reactive-course-form.component';
import { CounterComponent } from '../counter/counter.component';
import { CountersComponent } from '../counters/counters.component';
import { AsyncDemoComponent } from '../async-demo/async-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { MyInputComponent } from '../my-input/my-input.component';
import {appRoutes} from "../app-routing.module";

describe('RouterDemoComponent', () => {
  let component: RouterDemoComponent;
  let fixture: ComponentFixture<RouterDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        RouterDemoComponent,
        CourseFormComponent,
        ReactiveCourseFormComponent,
        CountersComponent,
        CounterComponent,
        ValidationErrorsComponent,
        MyInputComponent,
        AsyncDemoComponent
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
