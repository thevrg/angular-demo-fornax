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

    getCourse(): Promise<Course> {
        const response = Object.assign({}, this._course);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response);
            }, 1000);
        });
    }

    setCourse(changedCourse: Course): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                this._course = changedCourse;
                resolve();
            }, 1000);
        });
    }


}
