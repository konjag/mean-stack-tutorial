import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class CanActivateAdminService implements CanActivate {

  constructor(
    private userService: UserService
  ) { }

  canActivate() {
    let isAdmin = false;
    this.userService.currentUser.subscribe(user => {
      isAdmin = user.admin;
    });

    return isAdmin;
  }
}
