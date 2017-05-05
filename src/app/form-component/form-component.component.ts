import { Component, OnInit } from '@angular/core';
import { CourseService, CourseInitiator } from '../course-service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css'],
  providers: [CourseService, CourseInitiator]
})
export class FormComponentComponent implements OnInit {

  minlength: number;
  maxlength: number;
  required: boolean = false;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.course;
  }

}
