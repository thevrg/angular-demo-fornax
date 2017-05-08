import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormComponent } from './course-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../course-service';
import { Course, COURSE_TYPES_WITH_NAMES_KEY, courseTypesWithNames } from '../course';
import { By } from '@angular/platform-browser';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { spyOnGetter } from '../test-helpers.spec';

describe('Spy on Properties', () => {
  class Alma {

    private _egy: string;

    constructor() {
    }

    get egy() {
      return this._egy;
    }

    set egy(newEgy: string) {
      this._egy = newEgy;
    }

  }

  it('should work', () => {
    const alma = new Alma();
    const egyGetter = spyOnGetter(alma, 'egy').and.returnValue('fakeEgy');
    alma.egy = 'xxx';
    expect(alma.egy).toBe('fakeEgy');
    egyGetter.and.callThrough();
    expect(alma.egy).toBe('xxx');
  });
});


describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  let fakeCourse: Course;

  const courseServiceStub: CourseService =
    jasmine.createSpyObj('CourseService', ['getCourse', 'setCourse']);

  const findField = (id: string) => {
    return fixture.debugElement.query(By.css(id));
  };

  (courseServiceStub.getCourse as jasmine.Spy).and.callFake(() => {
    return fakeCourse;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseFormComponent, ValidationErrorsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ], providers: [
        { provide: CourseService, useValue: courseServiceStub },
        { provide: COURSE_TYPES_WITH_NAMES_KEY, useValue: courseTypesWithNames }
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fakeCourse = new Course();
    fakeCourse.name = 'testName';
    fakeCourse.description = 'testDescription';
    fakeCourse.private = false;
    fakeCourse.type = null;

    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill the courseName field with the initial name', async(() => {

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(findField('#name').nativeElement.value).toBe('testName');
    });

  }));

  const doAfterTwoAsyncCycles = (callback: () => void) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.whenStable().then(callback);
    });
  };

  it('should show validation error, when course name is empty', async(() => {
    fakeCourse.name = ''; // empty
    doAfterTwoAsyncCycles(() => {
      expect(findField('#name').classes)
        .toEqual(jasmine.objectContaining({ 'ng-invalid': true }));
    });

  }));
  it('should show validation error, when course name is too short', () => {
    fakeCourse.name = 'x'; // shorter than 4 chars
    doAfterTwoAsyncCycles(() => {
      expect(findField('#name').classes)
        .toEqual(jasmine.objectContaining({ 'ng-invalid': true }));
      expect(findField('.alert').nativeElement.textContent)
        .toContain('at least 4 characters');
    });
  });
});
