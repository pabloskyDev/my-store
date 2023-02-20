import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  products: Product[] = [];
  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    // this.getProductSelected();
    this.getShoppingCart();
  }

  getProductSelected(products?: Product[]) {
      console.log(products);

    // this.storeService.myCart$.subscribe(products => {
    // });
  }

  getShoppingCart() {
    this.products = this.storeService.getShoppingCart();
    console.log('opción 2');
    console.log(this.products);
  }

}
