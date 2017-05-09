import {UserService} from './user-service';
import {Injectable, ReflectiveInjector} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {User} from "./user";

describe('UserService', () => {
  let userService: UserService;
  let injector: ReflectiveInjector;
  let backend: MockBackend;
  let lastConnection: MockConnection;
  const testUsers = [
    {id: '1', firstName: 'First1', lastName: 'Last1', hash: 'h1'},
    {id: '2', firstName: 'First2', lastName: 'Last2', hash: 'h2'}
  ];

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      UserService,
    ]);
    userService = injector.get(UserService);
    backend = injector.get(ConnectionBackend) as MockBackend;
    backend.connections.subscribe((connection: any) => lastConnection = connection);
  });

  it('getUsers() should query the service url', () => {
    userService.getUsers()
    expect(lastConnection).toBeDefined('no http service connection at all?');
    expect(lastConnection.request.url).toMatch(/\/api\/v01\/users$/, 'URL should be /api/v01/users');
  });

  it('getUsers() should return the received users', fakeAsync(() => {
    let result: User[];
    userService.getUsers().subscribe((users) => result = users);

    lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(testUsers),
    })));

    tick();
    expect(result.length).toEqual(2, 'should contain given amount of users');
    expect(result).toEqual(jasmine.arrayContaining(testUsers), ' result should contain the two test users');
  }));

  it('getUsers() while server is down', fakeAsync(() => {
    let result: User[] = null;
    let catchedError: any = null;
    userService.getUsers().subscribe(users => result = users, error => catchedError = error);
    lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 404,
      statusText: 'URL not Found',
    })));
    tick();
    expect(result).toBeNull();
    expect(catchedError).toBeDefined();
  }));
});
