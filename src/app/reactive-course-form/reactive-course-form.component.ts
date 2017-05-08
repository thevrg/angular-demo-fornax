import { Component, OnInit, Inject, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Course, CourseType, courseTypesWithNames, COURSE_TYPES_WITH_NAMES_KEY } from '../course';
import { CourseService } from '../course-service';

@Component({
  selector: 'app-reactive-course-form',
  templateUrl: './reactive-course-form.component.html',
  styleUrls: ['./reactive-course-form.component.css']
})
export class ReactiveCourseFormComponent implements OnInit {
  @Input()
  course: Course;

  myForm: FormGroup;

  private _courseTypeOptions: {label: string, value: any}[];

  public get courseTypeOptions(): Iterable<{label: string, value: any}> {
    return this._courseTypeOptions;
  }

  constructor(private formBuilder: FormBuilder, private courseService: CourseService,
    @Inject(COURSE_TYPES_WITH_NAMES_KEY) private courseTypes: { value: CourseType, name: string }[]) {
    console.log('constructor of CourseFormComponent');
  }


  ngOnInit() {
    this.course = this.courseService.getCourse();
    console.log(JSON.stringify(this.course));
    this.myForm = this.formBuilder.group({
      name: [this.course.name, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)]],
      description: [this.course.description, [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(2000)]],
      type: [this.course.type, [
        Validators.required]],
      private: [this.course.private, []]
    });
    this.myForm.valueChanges.subscribe(this.onValueChange.bind(this));
    this._courseTypeOptions = [{label: 'None', value: ''}];
    this.courseTypes.map(courseTypeWithName => {
      return {label: courseTypeWithName.name, value: courseTypeWithName.value};
    }).forEach(option => this._courseTypeOptions.push(option));
  }

  onValueChange(course: Course) {
      this.course = course;
      console.log('onValueChange: ' + JSON.stringify(course));
  }

  onSubmit(): void {
    console.log('Form is submitted, course: ' + JSON.stringify(this.course));
    this.courseService.saveCourse(this.course);
  }

  onRevert(): void {
    this.course = this.courseService.getCourse();
    this.myForm.setValue(this.course);
  }
}
