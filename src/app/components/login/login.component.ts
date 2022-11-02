import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token: string = '';

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
    this.authService.login('juan-test@mail.com','98741')
    .subscribe(rta => {
      this.token = rta.access_token;
    })
  }

  getProfile() {
    this.authService.profile(this.token)
    .subscribe(profile => {
      console.log(profile)
    })
  }

}
