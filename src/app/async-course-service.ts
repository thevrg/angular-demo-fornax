import { Observable } from 'rxjs/Rx';
import { Course } from './course';
import { Inject, forwardRef, EventEmitter } from '@angular/core';
import { CourseInitiator } from './course-service';

export class AsyncCourseService {

    private _course: Course;
    private courseChanges = new EventEmitter<Course>(true);

    constructor( @Inject(forwardRef(() => CourseInitiator)) private courseInitiator: CourseInitiator) {
        console.log('constructor of CourseService');
        this._course = new Course();
        this.courseInitiator.init(this._course);

        setTimeout(() => {
            this._course = new Course();
            this._course.name = 'Hello';
            this.courseChanges.emit(this._course);
            setTimeout(() => {
                this._course.name = 'Hello Changed';
                this.courseChanges.emit(this._course);
            }, 3000);
        }, 3000);
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

    getCourseChanges(): Observable<Course> {
        return this.courseChanges.asObservable();
    }

    getCounterObservable(): Observable<number> {
        return Observable.interval(1000).
        map(v => v * 10).share();
    }

}
