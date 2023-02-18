import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();

  constructor() { }

  getShoppingCart() {
    return this.myShoppingCart;
  }

  addProduct(product: Product) {
    if(this.myShoppingCart.length == 0) {
      this.myShoppingCart.push(product);
      this.myCart.next(this.myShoppingCart);
    }else{
      if(this.myShoppingCart.indexOf(product) === -1) {
        this.myShoppingCart.push(product);
        this.myCart.next(this.myShoppingCart);
      }else {
        const index = this.myShoppingCart.indexOf(product);
        this.myShoppingCart.splice(index, 1);
        this.myCart.next(this.myShoppingCart);
      }
    }
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
