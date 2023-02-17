import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { User } from '../../models/user.model';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { Category } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() categorySelected = new EventEmitter<string>();
  activeMenu = false;
  counter = 0;
  profile!: User;
  profileValid = false;

  categories: Category[] = [];
  showAccount = false;
  email = '';

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loggedIn();
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getCategories();
  }

  getCategories() {
    this.productsService.getCategory().subscribe({
      next: (res) => {
        this.categories = res;
      }
    })
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  filterCategory(id: string) {
    this.categorySelected.emit(id);
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
}
