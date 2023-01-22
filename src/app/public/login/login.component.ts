import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token: string = '';
  profile: User = {
    id: '',
    email: '',
    password: '',
    name: ''
  }

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    return
  }

  createUser() {
    this.usersService.create({
      name: 'Juan',
      email: 'juan-test@mail.com',
      password: '98741'
    })
    .subscribe(rta => {
      console.log(rta)
    })
  }

  login() {
    this.authService.loginAndGet('juan-test@mail.com','98741')
    .subscribe(user => {
      this.profile = user;
    })
  }

}
