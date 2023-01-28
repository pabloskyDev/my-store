import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  formRecovery = this.fb.nonNullable.group({
    // john@mail.com
    email: ['', [Validators.required, Validators.email]]
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formRecovery.markAllAsTouched();
    if (this.formRecovery.invalid) return;

  }

}
