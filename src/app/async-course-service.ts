import { Observable } from 'rxjs/Rx';
import { Course } from './course';
import { Inject, forwardRef } from '@angular/core';
import { CourseInitiator } from './course-service';

export class AsyncCourseService {

    private _course: Course;

    constructor(@Inject(forwardRef(() => CourseInitiator)) private courseInitiator: CourseInitiator) {
        console.log('constructor of CourseService');
        this._course = new Course();
        this.courseInitiator.init(this._course);
    }

    get course() {
        return Object.assign({}, this._course);
        // return this._course;
    }

    set course(changedCourse: Course) {
        this._course = Object.assign({}, changedCourse);
    }


}
