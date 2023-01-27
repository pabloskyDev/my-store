import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  token!: string;
  profile!: User;
  formLogin = this.fb.nonNullable.group({
    email: ['john@mail.com', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private fb: FormBuilder
  ) { }

  onSubmit() {
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) return;

    this.login();
  }

  login() {
    const email = this.formLogin.getRawValue().email;
    const password = this.formLogin.getRawValue().password;

    localStorage.setItem('email', email);

    this.authService.login(email,password).subscribe({
      next: () => {

      },
      error: () => {
        console.log('No puede ingresar');
      }
    });

  }

  //todo create-account
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

}
