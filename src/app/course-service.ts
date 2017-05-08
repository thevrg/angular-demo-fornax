import { Course } from './course';
import { Injectable, Inject, forwardRef } from '@angular/core';



@Injectable()
export class CourseService {

    private _course: Course;

    constructor(@Inject(forwardRef(() => CourseInitiator)) private courseInitiator: CourseInitiator) {
        console.log('constructor of CourseService');
        this._course = new Course();
        this.courseInitiator.init(this._course);
    }

    getCourse() {
        return Object.assign({}, this._course);
        // return this._course;
    }

    saveCourse(changedCourse: Course) {
        this._course = Object.assign({}, changedCourse);
    }

}

export class CourseInitiator {

    constructor() {
        console.log('constructor of CourseInitiator')
    }

    init(course: Course) {
        course.name = 'Initial name';
        course.description = 'Hello Course Description';
    }
}
