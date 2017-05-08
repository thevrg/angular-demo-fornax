import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInputComponent } from './my-input.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { DebugElement } from '@angular/core/core';
import { By } from '@angular/platform-browser';

describe('MyInputComponent', () => {
  let component: MyInputComponent;
  let fixture: ComponentFixture<MyInputComponent>;

  const findInDOM: ((string) => DebugElement) = (selector) => {
    return fixture.debugElement.query(By.css(selector));
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [MyInputComponent, ValidationErrorsComponent]
    })
      .overrideTemplate(ValidationErrorsComponent,
      `<div id="field">{{field != null ? 'present' : 'missing'}}</div>
      <div id="label">{{label}}</div>`)
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a text input field normally', () => {
    component.name = 'test';
    component.label = 'Test Name';
    component.type = 'text';
    component.form = new FormGroup({ test: new FormControl('hello') });
    fixture.detectChanges();

    expect(findInDOM('input[type="text"]')).toBeTruthy('input type=text not found in DOM');
  });
});
