import { Component } from '@angular/core';
import { CourseService, CourseInitiator } from './course-service';
import { courseTypesWithNames } from './course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    CourseService,
    CourseInitiator
  ]
})
export class AppComponent {
  title = 'app works!';
}
