import { Component, OnInit } from '@angular/core';
import { AsyncCourseService } from '../async-course-service';
import { Observable } from 'rxjs/Rx';
import { Course } from '../course';

@Component({
  selector: 'app-async-demo',
  templateUrl: './async-demo.component.html',
  styleUrls: ['./async-demo.component.css'],
  providers: [AsyncCourseService]
})
export class AsyncDemoComponent implements OnInit {

  courseAsync: Observable<Course>;
  counterAsync: Observable<number>;

  constructor(private asyncCourseService: AsyncCourseService) {

  }

  ngOnInit() {
    this.courseAsync = this.asyncCourseService.getCourseChanges();
    this.counterAsync = this.asyncCourseService.getCounterObservable();
  }

}
