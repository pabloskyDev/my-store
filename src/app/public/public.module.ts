import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../components/input/input.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { EmailSentComponent } from './email-sent/email-sent.component';


@NgModule({
  declarations: [
    LoginComponent,
    RecoveryComponent,
    EmailSentComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent
  ]
})
export class PublicModule { }
