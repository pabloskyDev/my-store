import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImgComponent } from 'src/app/components/img/img.component';

import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ CommonModule, ImgComponent ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: Product;
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  // Otra forma de inicializar clave-valor de objeto producto
  // @Input('product') product!: Product;

  constructor() { }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }
}
