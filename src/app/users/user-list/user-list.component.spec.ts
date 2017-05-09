import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../user-service';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Subscriber } from "rxjs/Rx";

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let subscriber: Subscriber<User[]>;

  const findTDs = (tr: DebugElement) => tr.queryAll(By.css('td'));
  const extractTableData: (() => string[][]) = () => {
    return fixture.debugElement.queryAll(By.css('tr'))
      .slice(1)
      .map(tr => findTDs(tr)
        .map(td => td.nativeElement.textContent.trim() as string));
  };

  const getUsersObservable = {
    subscribe: (s) => {
      subscriber = s;
    }
  } as Observable<User[]>;

  const userService: UserService = {
    getUsers: () => getUsersObservable
  } as UserService;

  const validResponse: User[] = [
    { id: '1', firstName: 'First1', lastName: 'Last1', hash: 'h1' },
    { id: '2', firstName: 'First2', lastName: 'Last2', hash: 'h2' }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [{ provide: UserService, useValue: userService }]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the users in a table', fakeAsync(() => {


    subscriber.next(validResponse);

    fixture.detectChanges();
    const tableData = extractTableData();


    expect(tableData[0]).toEqual(['1', 'First1', 'Last1']);
    expect(tableData[1]).toEqual(['2', 'First2', 'Last2']);
  }));
});
