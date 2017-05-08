import { AsyncCourseService } from './async-course-service';
import { CourseInitiator } from './course-service';
import { Course } from './course';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

describe('AsyncCourseService', () => {
  it('should create an instance', () => {
    expect(new AsyncCourseService(new CourseInitiator())).toBeTruthy();
  });

  let service: AsyncCourseService;
  const courseInitiator: CourseInitiator = jasmine.createSpyObj('CourseInitiator', ['init']);
  const initSpy = (courseInitiator.init as jasmine.Spy);

  initSpy.and.callFake((course: Course) => {
    course.name = ''; //causes a validation error
    course.description = 'This is a valid description';
    course.type = null;
    course.private = false;
  });

  beforeEach(() => {
    service = new AsyncCourseService(courseInitiator);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('fakeAsync and timeout callback', fakeAsync(() => {
    let course = null;
    service.getCourse().then(c => course = c);
    tick(100);
    expect(course).toBeNull();
    tick(100);
    expect(course).toBeNull();
    tick(800);
    expect(course).not.toBeNull();
  }));

  it('fakeAsync and observable', fakeAsync(() => {
    let num = null;
    function onNext(x) {
        console.log(x);
    }
    function onError(x) {
        console.log('Error: ' + x);
    }
    function done() {
        console.log('DONE');
    }
    const subscription = service.getCounterObservable().do(x => onNext, onError => onError).subscribe(n => num = n);
    tick(1000);
    expect(num).toBe(0);
    tick(1000);
    expect(num).toBe(10);
    tick(1000);
    expect(num).toBe(20);
    tick(1000);
    expect(num).toBe(30);
    subscription.unsubscribe();
  }));
});
