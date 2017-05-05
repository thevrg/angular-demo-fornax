import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the initial counter value, which is passed in as "counterValue"', () => {
    component.counterValue = 101;
    fixture.detectChanges();
    const outerdiv = fixture.debugElement.query(By.css('div'));
    expect(outerdiv.nativeElement.textContent).toContain('Counter: 101');
  });

});
