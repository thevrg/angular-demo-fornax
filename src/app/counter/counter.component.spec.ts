import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from "@angular/core/core";

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

  const expectCounterValueInDOM = (expectedValue: number) => {
     const outerdiv = fixture.debugElement.query(By.css('div'));
     expect(outerdiv.nativeElement.textContent).toContain('Counter: ' + expectedValue);
  };

  const findElementById: (string) => DebugElement = (id: string) => {
    return fixture.debugElement.query(By.css('#' + id));
  };

  const clickButton = (id: string) => {
    findElementById(id).triggerEventHandler('click', null);
  };

  it('should display the initial counter value, which is passed in as "counterValue"', () => {
    component.counterValue = 101;
    fixture.detectChanges();
    expectCounterValueInDOM(101);
  });

  it('should decrese the counterValue, when the decrease button is clicked', () => {
    component.counterValue = 101;
    // WHEN
    clickButton('decreaseButton');
    fixture.detectChanges();
    // THEN
    expect(component.counterValue).toBe(100);
    expectCounterValueInDOM(100);
  });

  it('should increase the counterValue, when the increase button is clicked', () => {
    component.counterValue = 101;
    // WHEN
    clickButton('increaseButton');
    fixture.detectChanges();
    // THEN
    expect(component.counterValue).toBe(102);
    expectCounterValueInDOM(102);
  });

  it('should send a counterChanged event with the actual value, when the increase button is clicked', () => {
    component.counterValue = 101;
    let lastEvent: number;
    component.counterChanged.subscribe((event) => {
       lastEvent = event;
    });
    // WHEN
    clickButton('increaseButton');
    fixture.detectChanges();
    // THEN
    expect(lastEvent).toBe(102);
  });

  it('should send a counterChanged event with the actual value, when the decrease button is clicked', () => {
    component.counterValue = 101;
    let lastEvent: number;
    component.counterChanged.subscribe((event) => {
       lastEvent = event;
    });
    // WHEN
    clickButton('decreaseButton');
    fixture.detectChanges();
    // THEN
    expect(lastEvent).toBe(100);
  });

});
