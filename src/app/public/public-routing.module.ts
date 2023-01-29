import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { LoginComponent } from './login/login.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { RecoveryComponent } from './recovery/recovery.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'recovery/:id',
    component: NewPasswordComponent
  },
  {
    path: 'sent',
    component: EmailSentComponent
  },
  {
    path: 'new-account',
    component: NewAccountComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
