import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {User} from '../user';
import {UserService} from '../user-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersAsync: Observable<User[]> = null;

  constructor(private userService: UserService) {
    this.usersAsync = this.userService.getUsers();
  }

  ngOnInit() {
  }

}
