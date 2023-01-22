import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeMenu: boolean = false;
  counter = 0;
  profile: User = {
    id: '',
    email: '',
    password: '',
    name: ''
  }
  profileValid: boolean = false;


  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService
    .loginAndGet('juan-test@mail.com','98741')
    // .pipe(
    //   switchMap(actualToken => {
    //     this.token = actualToken.access_token;
    //     console.log(this.token)
    //     return this.authService.profile(this.token);
    //   })
    // )
    .subscribe(user => {
      this.profileValid = true;
      this.profile = user;
    })
  }
}
