import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserPayload } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() isRegister = false;
  private user: UserPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.isRegister) {
      this.userService.register(this.user).subscribe(() => {
        this.router.navigateByUrl('/');
      })
    }

    this.userService.login(this.user).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
