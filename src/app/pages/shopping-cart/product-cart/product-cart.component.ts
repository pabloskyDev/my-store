import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {

  @Input() product!: Product;
  @Output() removeProduct = new EventEmitter<Product>();
  imgUrl = '../../../../assets/images/bike.jpg';
  activeProduct = false;
  constructor() { }

  ngOnInit(): void {
    if(this.product.images[0]) {
      this.imgUrl = this.product.images[0];
    }
  }

  onRemoveToCart() {
    this.removeProduct.emit(this.product);
    this.activeProduct = !this.activeProduct;
  }


}
