import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveCourseFormComponent } from './reactive-course-form.component';
import { Component, Input } from '@angular/core';
import { Course, CourseType, courseTypesWithNames, COURSE_TYPES_WITH_NAMES_KEY } from '../course';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyInputComponent } from '../my-input/my-input.component';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { CourseService } from '../course-service';

@Component({
  selector: 'app-reactive-course-form',
  template: 'ReactiveCourseFormStubComponent'
})
export class ReactiveCourseFormStubComponent {
  @Input()
  course: Course;
}


describe('ReactiveCourseFormComponent', () => {
  let component: ReactiveCourseFormComponent;
  let fixture: ComponentFixture<ReactiveCourseFormComponent>;
  let courseService: CourseService;
  let getCourseSpy: jasmine.Spy;
  let saveCourseSpy: jasmine.Spy;
  let course: Course;

  beforeEach(async(() => {
    courseService = jasmine.createSpyObj('CourseService', ['getCourse', 'saveCourse']);
    getCourseSpy = courseService.getCourse as jasmine.Spy;
    saveCourseSpy = courseService.saveCourse as jasmine.Spy;

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        ReactiveCourseFormComponent,
        MyInputComponent,
        ValidationErrorsComponent],
    })
      .overrideComponent(ReactiveCourseFormComponent,
      {
        add: {
          providers: [
            { provide: CourseService, useValue: courseService },
            { provide: COURSE_TYPES_WITH_NAMES_KEY, useValue: courseTypesWithNames }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {

    course = new Course();
    course.name = 'Course Name';
    course.description = 'Course Description';
    course.type = CourseType.LIVE_VIRTUAL;
    course.private = false;

    getCourseSpy.and.returnValue(course);

    fixture = TestBed.createComponent(ReactiveCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show validation error on empty name field', () => {
    const nameComponent = component.myForm.controls.name;
    nameComponent.setValue('');
    expect(nameComponent.valid).toBeFalsy('Empty name should not be accepted');
    expect(nameComponent.errors.required).toBeTruthy('Required error should be there');
  });
});
