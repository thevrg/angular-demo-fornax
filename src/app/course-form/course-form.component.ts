import { Component, OnInit, Inject, Input } from '@angular/core';
import { Course, CourseType, courseTypesWithNames, COURSE_TYPES_WITH_NAMES_KEY } from '../course';
import { CourseService, CourseInitiator } from '../course-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
})
export class CourseFormComponent implements OnInit {

  @Input()
  course: Course;

  myForm: FormGroup;

  CourseType = CourseType;

  constructor(private fb: FormBuilder, private courseService: CourseService,
    @Inject(COURSE_TYPES_WITH_NAMES_KEY) readonly courseTypes: { value: CourseType, name: string }[]) {
    console.log('constructor of CourseFormComponent');
  }

  ngOnInit() {
    this.course = this.courseService.getCourse();
    console.log(JSON.stringify(this.course));
  }

  onSubmit(): void {
    console.log('Form is submitted, course: ' + JSON.stringify(this.course));
    this.courseService.saveCourse(this.course);
  }

  onRevert(): void {
    this.course = this.courseService.getCourse();
  }

}
