import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncDemoComponent } from './async-demo.component';
import { CourseInitiator } from '../course-service';
import {AsyncCourseService} from "../async-course-service";

describe('AsyncDemoComponent', () => {
  let component: AsyncDemoComponent;
  let fixture: ComponentFixture<AsyncDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncDemoComponent ],
      providers: [CourseInitiator, AsyncCourseService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
