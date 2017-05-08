import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountersComponent } from './counters.component';
import { CounterComponent } from '../counter/counter.component';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { spyOnGetter } from '../test-helpers.spec';

describe('CountersComponent', () => {
  let component: CountersComponent;
  let fixture: ComponentFixture<CountersComponent>;

  let router;
  let navigateSpy: jasmine.Spy;
  let paramsObservable: EventEmitter<any>;
  let subscribeSpy;
  let activatedRoute: { params: EventEmitter<any> };

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    navigateSpy = router.navigate;
    paramsObservable = new EventEmitter<any>();
    console.log(paramsObservable);
    subscribeSpy = spyOn(paramsObservable, 'subscribe').and.callThrough();
    activatedRoute = { params: paramsObservable };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountersComponent, CounterComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set red, green and blueCounter if the router params are changing', async(() => {
    paramsObservable.emit({ red: 999, green: 888, blue: 777 });
    expect(component.redCounter).toBe(999);
    expect(component.greenCounter).toBe(888);
    expect(component.blueCounter).toBe(777);
  }));
});
