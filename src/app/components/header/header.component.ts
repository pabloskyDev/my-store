import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { User } from '../../models/user.model';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { Category, Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() showCart = false;
  @Output() categorySelected = new EventEmitter<string>();
  @Output() showShoppingCart = new EventEmitter<boolean>();
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
    this.getCounter();
    this.getCategories();
  }

  getCounter() {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  getCategories() {
    this.productsService.getCategory().subscribe({
      next: (res) => {
        this.categories = res;
      }
    })
  }

  toggleMenu(){
    this.showShoppingCart.emit(false);
    this.activeMenu = !this.activeMenu;
  }

  filterCategory(id: string) {
    this.categorySelected.emit(id);
    this.toggleMenu();
  }

  viewCart() {
    this.showShoppingCart.emit(true);
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
