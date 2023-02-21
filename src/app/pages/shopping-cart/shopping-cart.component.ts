import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @Output() showCart = new EventEmitter<boolean>();
  products: Product[] = [];
  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

  toggleCart() {
    this.showCart.emit(false);
  }
}
