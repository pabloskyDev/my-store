import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile!: User;
  profileValid = false;

  showAccount = false;
  email = '';

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loggedIn();
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  loggedIn() {
    if(localStorage.getItem('token')) {
      this.showAccount = true;
      this.email = localStorage.getItem('email') || '';
    }else {
      this.showAccount = false;
    }
  }

  logout() {
    this.authService.logOut();
  }

  // Todo delete this function
  login() {
    /*this.authService
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
    })*/
  }
}
