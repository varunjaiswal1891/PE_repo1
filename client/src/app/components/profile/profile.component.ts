import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';
import {User} from '../../user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  users: User[];

  constructor(
  private authService: AuthService,
  private router: Router) { }

  ngOnInit() {

    this.authService.getProfile()
    .subscribe(users => this.users = users);
   /* this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log('user details are  = ');
      console.log(profile.user);
    },
  err => {
    console.log('error on getting profie info varun');
    console.log(err);
    return false;
  });
  }  */
}
}
