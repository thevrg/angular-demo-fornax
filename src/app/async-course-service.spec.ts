import { AsyncCourseService } from './async-course-service';
import { CourseInitiator } from './course-service';
import { Course } from './course';

describe('AsyncCourseService', () => {
  it('should create an instance', () => {
    expect(new AsyncCourseService(new CourseInitiator())).toBeTruthy();
  });

  let service: AsyncCourseService;
  let courseInitiator: CourseInitiator = jasmine.createSpyObj('CourseInitiator', ['init']);
  let initSpy = (courseInitiator.init as jasmine.Spy);

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
  
});
