import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {UserService} from "./user-service";
import {UserListComponent} from "./user-list/user-list.component";

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  declarations: [
    UserListComponent
  ],
  providers: [
    UserService
  ]

})
export class UsersModule { }
