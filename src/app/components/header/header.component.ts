import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: User = null;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.isLoggedInSub.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  onLogoutClick() {
    this.userService.logout();
  }
}
