import { Component, OnInit, Inject } from '@angular/core';
import { Course, CourseType, courseTypesWithNames } from '../course';
import { CourseService, CourseInitiator } from '../course-service';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
  providers: [
    CourseService,
    CourseInitiator,
    { provide: 'FRUIT', useValue: 'CourseForm' },
    { provide: 'COURSE_TYPES_WITH_NAMES', useValue: courseTypesWithNames }]
})
export class CourseFormComponent implements OnInit {

  course: Course;

  constructor(private courseService: CourseService,
    @Inject('FRUIT') public fruit: string,
    @Inject('COURSE_TYPES_WITH_NAMES') readonly courseTypes: { value: CourseType, name: string }[]) {
    console.log('constructor of CourseFormComponent');
  }

  ngOnInit() {
    this.course = this.courseService.course;
    console.log(JSON.stringify(this.course));
  }

  onSubmit(): void {
    console.log('Form is submitted, course: ' + JSON.stringify(this.course));
    this.courseService.course = this.course;
  }

  onRevert(): void {
    this.course = this.courseService.course;
  }

}
