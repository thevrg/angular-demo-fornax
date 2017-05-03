import { Component, OnInit } from '@angular/core';
import { Course, CourseType } from '../course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  course: Course;
  csip = true;

  constructor() { }

  get courseTypes(): { value: CourseType, name: string }[] {
    return [
      { value: CourseType.INSTRUCTOR_LED, name: 'Instructor Led' },
      { value: CourseType.LIVE_VIRTUAL, name: 'Live Virtual' },
      { value: CourseType.SELF_PACED, name: 'Instructor Led' },
    ];
  }

  ngOnInit() {
    this.course = new Course();
    console.log(JSON.stringify(this.course));
  }

  onSubmit(): void {
    console.log('Form is submitted, course: ' + JSON.stringify(this.course));
  }

}
