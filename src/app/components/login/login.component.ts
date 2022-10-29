import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      console.log(rta.access_token)
    })
  }

}
