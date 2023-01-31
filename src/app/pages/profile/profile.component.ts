import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  token!: string;
  editAccount!: User;
  formAccount = this.fb.nonNullable.group({
    name: [{value: '', disabled: true}, Validators.required],
    email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
    password: [{value: '', disabled: true}, Validators.required]
  })
  isUpdate = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.getProfile(this.token);
  }

  getProfile(token: string) {
    this.authService.profile(token).subscribe({
      next: (res) => {
        this.editAccount = res;
        this.setFormValues(this.editAccount);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  setFormValues(user: User) {
    this.formAccount.patchValue({
      name: user.name,
      email: user.email,
      password: user.password
    })
  }


  onSubmit(valid: boolean) {
    this.formAccount.markAllAsTouched();
    if(this.formAccount.invalid) return

    if(valid === true){
      this.habilitateForm();
    }else {
      this.saveForm();
    }
  }

  habilitateForm() {
    this.isUpdate = false;
    this.formAccount.controls.name.enable();
    this.formAccount.controls.password.enable();
  }

  saveForm() {
    this.isUpdate = true;

    this.formAccount.controls.name.disable();
    this.formAccount.controls.password.disable();

    this.getProfile(this.token);
  }
}
