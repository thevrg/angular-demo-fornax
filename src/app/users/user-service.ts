import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import { User } from './user';

@Injectable()
export class UserService {

    private cachedUsers: User[] = [
        new User('001', 'Bela', 'Kovacs', 'abc123'),
        new User('002', 'Ferenc', 'Nagy', 'abc987')
    ];

    constructor(private http: Http) { }

    private saveIntoCache(users: User[]) {
        console.log('CACHING: ' + JSON.stringify(users));
        this.cachedUsers = users;
    }

    getUsers(): Observable<User[]> {
        return this.http.get('http://localhost:10010/api/v01/users')
            .map(response => response.json() as User[])
            .do(users => this.saveIntoCache(users))
            .catch((error, sourceObservable) => Observable.of(this.cachedUsers));
    }

}
