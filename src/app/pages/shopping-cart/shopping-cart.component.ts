import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @Output() showCart = new EventEmitter<boolean>();
  @Output() removeProduct = new EventEmitter<Product>();
  @Input() products: Product[] = [];
  total!: number[];
  totalPrice!: number;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.getTotal();
  }

  toggleCart() {
    this.showCart.emit(false);
  }

  getTotal() {
    this.total = this.products.map((product) =>
    {
      return product.price
    })
    this.totalPrice = this.total.reduce((a, b) => a + b, 0);
  }

  removeToShoppingCart(product: Product) {
    this.removeProduct.emit(product);
  }

}
