import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  newPasswordForm = this.fb.nonNullable.group({
    passwordNew: ['', Validators.required],
    passwordNewRepeat: ['', Validators.required]
  })
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.newPasswordForm.markAllAsTouched();
    if (this.newPasswordForm.invalid) return;

    if(this.newPasswordForm.getRawValue().passwordNew === this.newPasswordForm.getRawValue().passwordNewRepeat){
      this.router.navigate(['/auth']);
    }else {
      console.log('Las contraseñas no coinciden');
    }
  }

}
