import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  newAccountForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newAccountForm.markAllAsTouched();
    if (this.newAccountForm.invalid) return

    this.createUser();
  }

  createUser() {
    this.usersService.create(
      this.newAccountForm.getRawValue()
    )
    .subscribe({
      next: (res) => {
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        console.log('Error creando usuario ' + err);
      }
    })
  }

}
