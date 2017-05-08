import { CourseService, CourseInitiator } from './course-service';
import { ReflectiveInjector } from '@angular/core';
import { Course } from './course';
import { Observable } from 'rxjs/Rx';

describe('CourseService', () => {
  it('should create an instance with ReflectiveInjector', () => {
    const courseService = ReflectiveInjector
      .resolveAndCreate([CourseService, CourseInitiator])
      .get(CourseService);

    expect(courseService).toBeTruthy();
  });

  it('should create an instance', () => {
    const courseService = new CourseService(new CourseInitiator());
    expect(courseService).toBeTruthy();
  });

  describe('when creating a CourseService with a mock CourseInitator', () => {

    let initatorCalledWith: Course;
    let initiatorCalled;
    let courseService: CourseService;

    const mockInitiator: CourseInitiator = {
      init: (course: Course) => {
        initiatorCalled = true;
        initatorCalledWith = course;
        course.name = 'xyz';
      }
    };

    beforeEach(() => {
      initiatorCalled = false;
      initatorCalledWith = undefined;
    });

    it('should call the CourseInitiator\'s init method with a Course object', () => {
      //WHEN
      courseService = new CourseService(mockInitiator);
      //THEN
      expect(initiatorCalled).toBeTruthy();
      expect(initatorCalledWith).toEqual(jasmine.any(Course));
    });

    it('should return with the same Course object, that is passed to the init method', () => {
      //WHEN
      courseService = new CourseService(mockInitiator);
      //AND
      let returnedCourse = courseService.getCourse();
      //THEN
      expect(returnedCourse).toEqual(jasmine.objectContaining({ name: 'xyz' }));
    });

    it('should return the copy of the Course object and not the original reference', () => {
      //WHEN
      courseService = new CourseService(mockInitiator);
      //AND
      let returnedCourse = courseService.getCourse();
      //THEN
      expect(returnedCourse).not.toBe(initatorCalledWith);
    });

  });

  describe('when creating a CourseService with a spied CourseInitator', () => {

    let courseService: CourseService;

    let courseInitiator: CourseInitiator;
    let courseInitiatorSpy: jasmine.Spy;

    beforeEach(() => {
      courseInitiator = new CourseInitiator();
      courseInitiatorSpy = spyOn(courseInitiator, 'init');
      // Other way:
      // courseInitiator = jasmine.createSpyObj('CourseInitiator', ['init']);
    });

    it('should call the CourseInitiator\'s init method with a Course object', () => {
      //WHEN
      courseService = new CourseService(courseInitiator);
      //THEN
      expect(courseInitiatorSpy).toHaveBeenCalled();
      expect(courseInitiatorSpy.calls.mostRecent().args[0])
          .toEqual(jasmine.any(Course));
    });

    // it('should call the CourseInitiator\'s init method with a Course object', () => {
    //   //WHEN
    //   courseService = new CourseService(CourseInitiator.init);
    //   //THEN
    //   expect(courseInitiator.init.).toEqual(jasmine.any(Course));
    // });

    // it('should return with the same Course object, that is passed to the init method', () => {
    //   //WHEN
    //   courseService = new CourseService(mockInitiator);
    //   //AND
    //   let returnedCourse = courseService.course;
    //   //THEN
    //   expect(returnedCourse).toEqual(jasmine.objectContaining({ name: 'xyz' }));
    // });

    // it('should return the copy of the Course object and not the original reference', () => {

    //   //WHEN
    //   courseService = new CourseService(mockInitiator);
    //   // AND
    //   let returnedCourse = courseService.course;
    //   // THEN
    //   expect(returnedCourse).not.toBe(initatorCalledWith);
    // });

  });

});

describe('CourseInitiator', () => {
  it('should create an instance', () => {
    expect(new CourseInitiator()).toBeTruthy();
  });
});
