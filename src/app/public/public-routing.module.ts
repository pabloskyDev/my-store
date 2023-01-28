import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
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
  // {
  //   path: 'sent',
  //   component: LoginComponent
  // },
  // {
  //   path: 'new-password',
  //   component: LoginComponent
  // },
  // {
  //   path: 'new-account',
  //   component: LoginComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
